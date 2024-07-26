import Button from '@components/Button'

const SearchForm = ({ query, setQuery, searchArtists }) => {
  return (
    <form
      onClick={searchArtists}
      className='flex flex-col items-center gap-6 w-full'
    >
      <h2 className='text-3xl font-bold '>Search for Artists</h2>
      <input
        type='search'
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoComplete='off'
        placeholder='Type an artist name to begin...'
        className='border-4 border-violet-600 rounded-full py-2 px-4 text-base sm:text-xl w-full sm:w-120 text-slate-500'
      />
      <Button
        text='Search'
        type='submit'
        classes='bg-gradient-to-r from-violet-800 to-pink-800 text-white w-40 sm:w-64 py-2'
        title='Search for an artist'
      />
    </form>
  )
}

export default SearchForm
