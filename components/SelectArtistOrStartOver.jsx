import Button from '@components/Button'

const SelectArtistOrStartOver = ({ startOver }) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6'>
      <h2 className='text-xl font-bold '>Select an Artist</h2>
      <span>or</span>
      <Button
        text='Search Again'
        icon='redo'
        onClick={startOver}
        classes='bg-gradient-to-r from-pink-800 to-violet-800 text-white w-40 sm:w-52'
        title='Start Over'
      />
    </div>
  )
}

export default SelectArtistOrStartOver
