import 'animate.css'

import { useState } from 'react'

import { Jost } from 'next/font/google'
const defaultFont = Jost({
  weight: '400',
  subsets: ['latin']
})

import Artist from '@components/Artist'
import Footer from '@components/Footer'
import Logo from '@components/Logo'
import PlayerDetails from '@components/PlayerDetails'
import SearchForm from '@components/SearchForm'
import SelectArtistOrStartOver from '@components/SelectArtistOrStartOver'

const IndexPage = () => {
  const [query, setQuery] = useState('')
  const [artists, setArtists] = useState([])
  const [showForm, setShowForm] = useState(true)
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [relatedArtists, setRelatedArtists] = useState([])
  const [playingArtist, setPlayingArtist] = useState(null)
  const [playingTrack, setPlayingTrack] = useState(null)
  const [player, setPlayer] = useState(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const searchArtists = async e => {
    e.preventDefault()

    if (query.length < 3) return

    scrollToTop()

    try {
      const response = await fetch(`/api/search?q=${query}`)
      const data = await response.json()

      if (!data || !data.artists) return

      setArtists(data.artists.items)
      setShowForm(false)
    } catch (error) {
      console.error('Error searching for artists:', error)
    }
  }

  const selectArtist = async artist => {
    scrollToTop()
    stopPlayer()
    setSelectedArtist(artist)

    try {
      const response = await fetch(`/api/related-artists?id=${artist.id}`)
      const data = await response.json()
      setRelatedArtists(data.artists)
    } catch (error) {
      console.error('Error fetching related artists:', error)
    }
  }

  const previewArtist = async (artistId, artistName) => {
    if (!selectedArtist) return

    stopPlayer()

    try {
      const response = await fetch(`/api/top-tracks?id=${artistId}`)
      const data = await response.json()

      // Filter tracks to only include those with a preview URL
      const previewTracks = data.tracks.filter(track => track.preview_url)

      if (previewTracks.length === 0) {
        console.error('No preview tracks found')
        return
      }

      // Pick a random track to play
      const randomIndex = Math.floor(Math.random() * previewTracks.length)
      const randomTrack = previewTracks[randomIndex]
      const randomTrackName = randomTrack.name
      const randomTrackPreviewUrl = randomTrack.preview_url

      const audio = new Audio(randomTrackPreviewUrl)
      audio.play()
      setPlayer(audio)
      setPlayingTrack(randomTrackName)
      setPlayingArtist(artistName)
    } catch (error) {
      console.error('Error playing top track:', error)
    }
  }

  const surpriseMe = async () => {
    if (!selectedArtist && !relatedArtists) return

    stopPlayer()

    // Pick a random artist from the related artists
    const randomIndex = Math.floor(Math.random() * relatedArtists.length)
    const randomArtist = relatedArtists[randomIndex]

    if (!randomArtist) console.error('Error retrieving an artist')

    // Preview the artist
    previewArtist(randomArtist.id, randomArtist.name)

    // If player wasn't set, try again
    if (!player) console.error('Error playing track')
  }

  const stopPlayer = () => {
    if (!player) return

    player.pause()
    setPlayingArtist(null)
    setPlayingTrack(null)
    setPlayer(null)
  }

  const startOver = () => {
    stopPlayer()
    setQuery('')
    setShowForm(true)
    setArtists([])
    setSelectedArtist(null)
    setRelatedArtists([])
    scrollToTop()
  }

  return (
    <div
      className={
        defaultFont.className + ' min-h-screen bg-slate-950 text-slate-50'
      }
    >
      <div className='flex items-center justify-center mx-6'>
        <div className='flex flex-col items-center gap-10 py-16 px-4 sm:px-6'>
          <Logo isFormShown={showForm} />
          {showForm && (
            <SearchForm
              query={query}
              setQuery={setQuery}
              searchArtists={searchArtists}
            />
          )}

          {artists.length > 0 && !selectedArtist && (
            <div className='flex flex-col items-center justify-center gap-12 w-full'>
              <SelectArtistOrStartOver startOver={startOver} />

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
                {artists.map(artist => (
                  <Artist
                    key={artist.id}
                    artist={artist}
                    selectArtist={selectArtist}
                    withoutActionButtons
                    animationClasses='animate__fadeIn'
                  />
                ))}
              </div>
            </div>
          )}

          {selectedArtist && (
            <div className='flex flex-col gap-10 items-center justify-center w-full'>
              <div className='flex flex-col items-center gap-4'>
                <Artist
                  key={selectedArtist.id}
                  artist={selectedArtist}
                  selectArtist={selectArtist}
                  previewArtist={previewArtist}
                  surpriseMe={surpriseMe}
                  startOver={startOver}
                  animationClasses='animate__zoomIn'
                  isSelectedArtist
                />
              </div>

              <hr className='w-full p-0.5 border-none bg-gradient-to-r from-violet-950 to-pink-950 rounded-full' />

              {relatedArtists && relatedArtists.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
                  {relatedArtists.map(relatedArtist => (
                    <Artist
                      key={relatedArtist.id}
                      artist={relatedArtist}
                      selectArtist={selectArtist}
                      previewArtist={previewArtist}
                      animationClasses='animate__fadeIn'
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {player && (
            <PlayerDetails
              playingArtist={playingArtist}
              playingTrack={playingTrack}
              stopPlayer={stopPlayer}
            />
          )}

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default IndexPage
