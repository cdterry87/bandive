import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='pt-12'>
      <div className='flex flex-col gap-6 items-center text-center text-xs'>
        <div className='flex flex-col items-center gap-2'>
          <p className='italic'>Developed with</p>
          <a
            href='https://spotify.com'
            target='_blank'
            rel='noreferrer'
            aria-label='Visit Spotify'
            title='Visit Spotify'
          >
            <Image
              src='/images/spotify-logo.png'
              alt='Spotify Logo'
              width={160}
              height={48}
              className='hover:scale-105 hover:brightness-110 transition duration-300 ease-in-out'
            />
          </a>
        </div>

        <div className='flex items-center gap-2'>
          <span>&copy; 2024. Created by Chase Terry.</span>
          <span>|</span>
          <a
            href='https://chaseterry.com'
            className='font-bold underline'
            target='_blank'
            rel='noreferrer'
            aria-label='Visit my website!'
            title='Visit my website!'
          >
            https://chaseterry.com
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
