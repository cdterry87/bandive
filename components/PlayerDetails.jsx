import 'animate.css'

import Button from '@components/Button'
import SoundWaves from '@components/SoundWaves'

const PlayerDetails = ({ playingArtist, playingTrack, stopPlayer }) => {
  let animationClass = !playingArtist
    ? 'animate__bounceOutDown'
    : 'animate__bounceInUp'

  return (
    <div
      className={
        'animate__animated fixed bottom-4 sm:bottom-8 flex items-center justify-center w-full select-none z-50 ' +
        animationClass
      }
    >
      <div className='mx-8 bg-gradient-to-r from-violet-900 to-pink-900 border-4 text-violet-200 border-violet-950 px-8 py-2 shadow-lg rounded-xl sm:rounded-full w-full sm:w-120 hover:scale-110 transition duration-300 ease-in-out'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 relative w-full'>
          <SoundWaves />
          <div className='flex flex-col text-center sm:text-left'>
            <h4 className='font-bold text-base sm:text-lg'>{playingArtist}</h4>
            <p className='text-xs sm:text-sm'>{playingTrack}</p>
          </div>
          <Button
            text='Stop'
            onClick={stopPlayer}
            classes='w-32 sm:w-auto bg-violet-950 text-violet-200'
            title='Stop Track'
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerDetails
