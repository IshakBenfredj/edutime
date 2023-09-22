import './title.css'

const Title = ({title,minTitle}) => {
  return (
    <div id='title'>
        <h1>{title}</h1>
        <p>{minTitle}</p>
    </div>
  )
}

export default Title