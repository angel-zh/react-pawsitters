import React, { useEffect, useState } from 'react'

const PetSitterShow = ({ user, msgAlert }) => {

    const [petSitter, setPetSitter] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)

    // scroll to top on page load
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);


    return (
        <>
            Hello PetSitterShow
        </>
    )
}



export default PetSitterShow