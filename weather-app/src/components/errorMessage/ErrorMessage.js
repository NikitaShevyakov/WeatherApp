import img from './error.gif'

const ErrorMessage = () =>{
    const styles = {
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto'
    }

    return (
        <img style={styles} src={img} alt="Error"/>
    )
}

export default ErrorMessage;