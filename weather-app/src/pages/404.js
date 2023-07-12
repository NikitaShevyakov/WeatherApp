import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#fff'}}>Page doesn't exist</p>
            <Link 
                className='btn btn-danger'
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} 
                to="/">Back to main page</Link>
        </div>
    );
}

export default Page404;