import React from "react"
import { Link , useNavigate} from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="not-found-container">
            <h1>Sorry, the page you were looking for was not found.</h1>
            {/* <Link to="/" className="link-button">Return to Home</Link> */}
            <button className="link-button" onClick={ ()=>navigate('/') }  > Return to Home </button>
        </div>
    )
}