const PlayerDetails = ({ playingArtist, playingTrack, stopPlayer }) => {
  return (
    <div className='fixed bottom-8 flex items-center justify-center w-full select-none z-50'>
      <div className='mx-8 bg-gradient-to-r from-violet-900 to-pink-900 border-4 text-violet-200 border-violet-950 px-8 py-2 shadow-lg rounded-full w-full sm:w-120 hover:scale-110 transition duration-300 ease-in-out'>
        <div className='flex items-center justify-between gap-8'>
          <div className='flex flex-col'>
            <h4 className='font-bold text-base sm:text-lg'>{playingArtist}</h4>
            <p className='text-xs sm:text-sm'>{playingTrack}</p>
          </div>
          <div>
            <button
              onClick={stopPlayer}
              className='bg-violet-950 text-violet-200 rounded-full px-4 py-2 hover:brightness-125 transition duration-300 ease-in-out'
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerDetails
