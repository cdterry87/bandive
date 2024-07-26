import Icon from '@components/Icon'

const Button = ({
  text = null,
  icon = null,
  classes = null,
  title = null,
  type = null,
  onClick = null
}) => {
  return (
    <button
      className={
        classes +
        ' rounded-full px-4 py-1 sm:py-2 hover:brightness-125 transition duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer'
      }
      onClick={onClick}
      type={type}
      title={title}
    >
      {icon && <Icon name={icon} />}
      {text && <span>{text}</span>}
    </button>
  )
}

export default Button
