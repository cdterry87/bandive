import { useState } from 'react'
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

  const searchArtists = async e => {
    e.preventDefault()

    if (query.length < 3) return

    try {
      const response = await fetch(`/api/search?q=${query}`)
      const data = await response.json()

      if (!data || !data.artists) return

      setArtists(data.artists.items)
      setShowForm(false) // Hide the form after search is complete
    } catch (error) {
      console.error('Error searching for artists:', error)
    }
  }

  const selectArtist = artist => {
    setSelectedArtist(artist)
  }

  const searchAgain = () => {
    setQuery('')
    setShowForm(true)
    setArtists([])
    setSelectedArtist(null)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950 text-slate-50'>
      <div className='flex flex-col items-center gap-6 py-16 px-4 sm:px-6'>
        <h1 className={logo.className + ' text-7xl font-bold uppercase logo'}>
          Bandive
        </h1>
        {showForm && !selectedArtist ? (
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
                placeholder='Type an artist name to begin...'
                className='border-4 border-violet-600 rounded-full py-2 px-4 text-sm sm:text-xl w-full sm:w-96 text-slate-500'
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-violet-700 text-white rounded-full px-4 py-2 w-32 sm:w-64'
              >
                Search
              </button>
            </div>
          </form>
        ) : (
          <div className='flex justify-center'>
            <button
              onClick={searchAgain}
              className='bg-pink-700 text-white rounded-full px-4 py-2 w-32 sm:w-64'
            >
              Search Again
            </button>
          </div>
        )}

        {artists.length > 0 && !selectedArtist && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 py-8'>
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
        )}

        {selectedArtist && (
          <div className='flex flex-col items-center gap-4 py-8'>
            {selectedArtist.images[0] && (
              <img
                src={selectedArtist.images[0].url}
                alt={selectedArtist.name}
                className='rounded-full w-48 h-48 border-4 border-white hover:border-violet-700 hover:scale-110 cursor-pointer transition duration-300 ease-in-out'
              />
            )}
            <h3 className='font-bold text-xl group-hover:text-violet-200 transition duration ease-in-out'>
              {selectedArtist.name}
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default IndexPage
