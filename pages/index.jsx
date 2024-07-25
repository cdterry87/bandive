import { useState } from 'react'

import Head from 'next/head'

import { Covered_By_Your_Grace } from 'next/font/google'

const logo = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin']
})

const IndexPage = () => {
  const [query, setQuery] = useState('')
  const [artists, setArtists] = useState([])
  const [showForm, setShowForm] = useState(true)
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [relatedArtists, setRelatedArtists] = useState([])

  const searchArtists = async e => {
    e.preventDefault()

    if (query.length < 3) return

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
    setSelectedArtist(artist)

    try {
      const response = await fetch(`/api/related-artists?id=${artist.id}`)
      const data = await response.json()
      setRelatedArtists(data.artists)
    } catch (error) {
      console.error('Error fetching related artists:', error)
    }
  }

  const searchAgain = () => {
    setQuery('')
    setShowForm(true)
    setArtists([])
    setSelectedArtist(null)
  }

  return (
    <div>
      <Head>
        <title>Bandive</title>
        <meta
          property='og:title'
          content='Bandive will help you find recommendations based on your favorite artists! By Chase Terry'
          key='title'
        />
      </Head>

      <div className='min-h-screen flex items-center justify-center bg-slate-950 text-slate-50'>
        <div className='flex flex-col items-center gap-10 py-16 px-4 sm:px-6'>
          <div className='flex flex-col items-center gap-2'>
            <a href='/'>
              <h1
                className={
                  logo.className +
                  ' font-bold uppercase ' +
                  (showForm ? 'text-7xl' : 'text-4xl')
                }
              >
                Bandive
              </h1>
            </a>
            <p
              className={
                logo.className +
                ' text-center tracking-widest leading-9 ' +
                (showForm ? 'text-2xl' : 'text-lg')
              }
            >
              Find recommendations based on your favorite artists!
            </p>
          </div>
          {showForm && (
            <form
              onClick={searchArtists}
              className='flex flex-col items-center gap-6'
            >
              <h2 className='text-3xl font-bold '>Search for Artists</h2>
              <div className='flex justify-center'>
                <input
                  type='search'
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoComplete='off'
                  placeholder='Type an artist name to begin...'
                  className='border-4 border-violet-600 rounded-full py-2 px-4 text-sm sm:text-xl w-full sm:w-96 text-slate-500'
                />
              </div>
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='bg-gradient-to-r from-violet-800 to-pink-800 text-white rounded-full px-4 py-2 w-40 sm:w-64 hover:brightness-125 transition duration-300 ease-in-out'
                >
                  Search
                </button>
              </div>
            </form>
          )}

          {artists.length > 0 && !selectedArtist && (
            <div className='flex flex-col items-center justify-center gap-12'>
              <div className='flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6'>
                <h2 className='text-xl font-bold '>Select an Artist</h2>
                <span>or</span>
                <button
                  onClick={searchAgain}
                  className='bg-gradient-to-r from-pink-800 to-violet-800 text-white rounded-full px-4 py-2 w-40 sm:w-64 hover:brightness-125 transition duration-300 ease-in-out'
                >
                  Search Again
                </button>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
                {artists.map(artist => (
                  <button
                    key={artist.id}
                    className='flex flex-col items-center gap-4 group'
                    onClick={() => selectArtist(artist)}
                  >
                    {artist.images[0] && (
                      <img
                        src={artist.images[0].url}
                        alt={'Select ' + artist.name}
                        className='rounded-full w-48 h-48 border-4 border-white hover:border-violet-700 hover:scale-110 cursor-pointer transition duration-300 ease-in-out'
                      />
                    )}
                    <h3 className='font-bold text-xl group-hover:text-violet-200 transition duration ease-in-out'>
                      {artist.name}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedArtist && (
            <div className='flex flex-col gap-8 items-center justify-center'>
              <div className='flex flex-col items-center gap-4'>
                {selectedArtist.images[0] && (
                  <img
                    src={selectedArtist.images[0].url}
                    alt={selectedArtist.name}
                    className='rounded-full w-32 h-32 border-4 border-white'
                  />
                )}
                <h3 className='font-bold text-3xl text-center'>
                  {selectedArtist.name}
                </h3>
                <div className='flex flex-wrap items-center gap-6'>
                  <button>Play</button>
                  <button>Pause</button>
                  <button>Next</button>
                  <button>View</button>
                  <button>Start Over</button>
                </div>
              </div>
              {relatedArtists && relatedArtists.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
                  {relatedArtists.map(relatedArtist => (
                    <button
                      key={relatedArtist.id}
                      className='flex flex-col items-center gap-4 group'
                      onClick={() => selectArtist(relatedArtist)}
                    >
                      {relatedArtist.images[0] && (
                        <img
                          src={relatedArtist.images[0].url}
                          alt={'Select ' + relatedArtist.name}
                          className='rounded-full w-48 h-48 border-4 border-white hover:border-violet-700 hover:scale-110 cursor-pointer transition duration-300 ease-in-out'
                        />
                      )}
                      <h3 className='font-bold text-xl group-hover:text-violet-200 transition duration ease-in-out'>
                        {relatedArtist.name}
                      </h3>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IndexPage
