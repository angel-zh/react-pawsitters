import React, { useEffect, useState } from 'react'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dashboard = ({ user }) => {
    return (
        <div className='mt-3 container-fluid'>
            <h2 className='page-heading text-center'>My Dashboard</h2>
            <div className='row mx-5'>
                <div className='col-3 db-div-1'>
                    <h5 className='mt-1 container-fluid'> <FontAwesomeIcon icon={faLink} size='md' className='icon' /> My Links</h5>
                </div>
                <div className='col db-div-1'>
                    hello
                </div>
            </div>
            <div className='row mx-5 mt-3'>
                <div className='col db-div-2'>
                    hello
                </div>
                <div className='col db-div-2'>
                    hello
                </div>
            </div>

        </div>
    )
}

export default Dashboard