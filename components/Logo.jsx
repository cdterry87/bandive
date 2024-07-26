import { Covered_By_Your_Grace } from 'next/font/google'

const logo = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin']
})

const Logo = ({ isFormShown }) => {
  let animationClasses = isFormShown
    ? 'animate__fadeInDown'
    : 'animate__fadeInUp'

  return (
    <div
      className={
        'flex flex-col items-center gap-2 animate__animated ' + animationClasses
      }
    >
      <a href='/'>
        <h1
          className={
            logo.className +
            ' font-bold uppercase ' +
            (isFormShown ? 'text-7xl' : 'text-4xl')
          }
        >
          Bandive
        </h1>
      </a>
      <p
        className={
          logo.className +
          ' text-center tracking-widest leading-9 ' +
          (isFormShown ? 'text-2xl' : 'text-lg')
        }
      >
        Find recommendations based on your favorite artists!
      </p>
    </div>
  )
}

export default Logo
