const Button = ({ text, classes, title, type = null, onClick = null }) => {
  return (
    <button
      className={
        classes +
        ' rounded-full px-4 py-1 sm:py-2 hover:brightness-125 transition duration-300 ease-in-out'
      }
      onClick={onClick}
      type={type}
      title={title}
    >
      {text}
    </button>
  )
}

export default Button
