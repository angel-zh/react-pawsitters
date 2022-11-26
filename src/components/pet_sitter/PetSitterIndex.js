
import React, { useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { petSitterIndex } from '../../api/petSitter'


// const cardContainerLayout = {
//     display: 'flex',
//     flexFlow: 'row wrap',
//     justifyContent: 'center'
// }
const linkStyle = {
    color: 'black',
    textDecoration: 'none'
}
const PetSitterIndex = ({ user, msgAlert }) => {

    const [allPetSitters, setAllPetSitters] = useState([])

    useEffect(() => {
        petSitterIndex(user)
            .then(res => {
                console.log(res.data)
                setAllPetSitters(res.data.pet_sitters)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Index Failure: ' + error,
                    variant: 'danger'
                })
            })
    }, [])

    // map over all restaurants to produce cards to display each restaurant with an image and link
    const petSitterCards = allPetSitters.map(petSitter => (
        <Link to={`/petsitters/${petSitter.owner}`} style={linkStyle}>
            <Card key={petSitter.Owner} style={{ width: 'auto', margin: 8, backgroundColor: '#afc2f2' }}>
                <Card.Body>
                    <Image src='https://i.imgur.com/2y0Ysu1.jpg' className=' profile-pic float-start border'></Image>
                    <Card.Text>
                        <h3>{petSitter.first_name} {petSitter.last_name}</h3>

                        {
                            petSitter.dog_walking
                                ?
                                <h5>Dog Walker</h5>
                                :
                                null
                        }
                        {
                            petSitter.pet_sitting
                                ?
                                <h5>Pet Sitter</h5>
                                :
                                null
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    ))

    return (
        <div className='container-md'>
            <Link to='create'>
                Register to be a Pet Sitter
            </Link>

            <h2 className='text-center mt-3'>All Pet Sitters</h2>
            <div className='container-md text-center pet-sitter-index'>

                {petSitterCards}

            </div>

        </div>
    )
}

export default PetSitterIndex


