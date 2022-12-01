import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='container-fluid homepage'>
            <h3 className='page-heading'> ERROR </h3>
            
            <h4>Oops! You weren't supposed to see this!</h4>
            <h5>Return to the homepage and try again. </h5>
            <Link to='/' className='btn btn-outline-info mx-1'>PawSitters Homepage</Link>
        </div>
    )
}

export default Error