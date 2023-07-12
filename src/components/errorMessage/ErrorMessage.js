import img from './error.gif'

const ErrorMessage = ({errorMsg = ''}) =>{
    const styles = {
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto'
    }
    return (
        <>
            <img style={styles} src={img} alt="Error"/>        
            {errorMsg && <p>{errorMsg}</p>}
        </>
    )
}

export default ErrorMessage;