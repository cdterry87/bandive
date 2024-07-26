const SearchForm = ({ query, setQuery, searchArtists }) => {
  return (
    <form onClick={searchArtists} className='flex flex-col items-center gap-6'>
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
  )
}

export default SearchForm
