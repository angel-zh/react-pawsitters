
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { petSitterIndex } from '../../api/petSitter'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
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

        <Card key={petSitter.id} style={{ width: '30rem', margin: 8, backgroundColor: '#f2f6ec' }}>
            {/* <Card.Img variant="top" src={FoodImages[`${restaurant.type}`]} style={{ height: '300px' }} alt={restaurant.type} /> */}
            <Card.Header><b>{petSitter.first_name} {petSitter.last_name}</b> </Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/petsitters/${petSitter.id}`}>View details</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className='container-md'>
            <Link to='create'>
				Register to be a Pet Sitter
			</Link>
            <h2 className='text-center mt-3'>All Pet Sitters</h2>
            <div className='container-md text-center' style={cardContainerLayout}>

                {petSitterCards}
            </div>
			

        </div>
    )
}

export default PetSitterIndex


