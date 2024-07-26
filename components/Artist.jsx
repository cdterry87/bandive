import Image from 'next/image'

const Artist = ({
  artist,
  selectArtist,
  previewArtist,
  startOver = null,
  isSelectedArtist = false,
  withoutActionButtons = false
}) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <button
        className={
          (isSelectedArtist ? 'cursor-default' : 'cursor-pointer') +
          ' flex flex-col items-center gap-4 group'
        }
        title='Select this Artist'
        onClick={() => !isSelectedArtist && selectArtist(artist)}
      >
        {artist.images[0] ? (
          <img
            src={artist.images[0].url}
            alt={'Select ' + artist.name}
            className='w-48 h-48 border-4 border-white hover:border-violet-700 hover:scale-110 transition duration-300 ease-in-out'
          />
        ) : (
          <Image
            src='/images/unavailable.jpg'
            alt='Artist Image Unavailable'
            height={64}
            width={64}
            className='rounded-full w-48 h-48 border-4 border-white hover:border-violet-700 hover:scale-110 cursor-pointer transition duration-300 ease-in-out'
          />
        )}
        <h3 className='font-bold text-xl group-hover:text-violet-200 transition duration ease-in-out'>
          {artist.name}
        </h3>
      </button>

      {!withoutActionButtons && (
        <div
          className={
            (isSelectedArtist ? 'text-base' : 'text-xs') +
            ' flex items-center gap-2'
          }
        >
          <button
            onClick={() => previewArtist(artist.id, artist.name)}
            className='rounded-full bg-violet-800 text-white px-4 py-2 hover:brightness-125 transition duration-300 ease-in-out'
            title='Listen to a clip of this artist'
          >
            Preview
          </button>

          {artist.external_urls && artist.external_urls.spotify && (
            <a
              href={artist.external_urls.spotify}
              target='_blank'
              referrerPolicy='noreferrer'
              className='rounded-full bg-spotify-green text-spotify-black font-bold px-4 py-2 hover:brightness-125 transition duration-300 ease-in-out'
              title='View on Spotify'
            >
              View on Spotify
            </a>
          )}

          {startOver && (
            <button
              onClick={() => startOver()}
              className='rounded-full bg-pink-800 text-white px-4 py-2 hover:brightness-125 transition duration-300 ease-in-out'
              title='Start Over'
            >
              Start Over
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Artist
