const SelectArtistOrStartOver = ({ startOver }) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6'>
      <h2 className='text-xl font-bold '>Select an Artist</h2>
      <span>or</span>
      <button
        onClick={startOver}
        className='bg-gradient-to-r from-pink-800 to-violet-800 text-white rounded-full px-4 py-2 w-40 sm:w-52 hover:brightness-125 transition duration-300 ease-in-out'
      >
        Search Again
      </button>
    </div>
  )
}

export default SelectArtistOrStartOver
