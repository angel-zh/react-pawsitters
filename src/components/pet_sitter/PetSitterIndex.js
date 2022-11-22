import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { restaurantIndex } from '../../api/restaurant'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PetSitterIndex = ({ user, msgAlert }) => {

    // const [allPetSitters, setAllPetSitters] = useState([])

    // useEffect(() => {
    //     restaurantIndex(user)
    //         .then(res => {
    //             setAllPetSitters(res.data.petsitters)
    //         })
    //         .catch((error) => {
    //             msgAlert({
    //                 heading: 'Failure',
    //                 message: 'Index Failure: ' + error,
    //                 variant: 'danger'
    //             })
    //         })
    // }, [])

    // map over all restaurants to produce cards to display each restaurant with an image and link
    // const restaurantCards = allRestaurants.map(restaurant => (

    //     <Card key={restaurant.id} style={{ width: '30rem', margin: 8, backgroundColor: '#f2f6ec' }}>
    //         <Card.Img variant="top" src={FoodImages[`${restaurant.type}`]} style={{ height: '300px' }} alt={restaurant.type} />
    //         <Card.Header><b>{restaurant.name}</b> / {restaurant.type}</Card.Header>
    //         <Card.Body>
    //             <Card.Text>
    //                 <Link style={{ color: '#ba7a5f', textDecoration: 'none', fontWeight: 'bold' }} to={`/restaurants/${restaurant._id}`}>View {restaurant.name} </Link>
    //             </Card.Text>
    //         </Card.Body>
    //     </Card>
    // ))

    return (
        <>
            Hello PetSitterIndex
            <Link to={`/petsitters/petsittershow`}>View PetSitterShow </Link>
        </>
    )
}

export default PetSitterIndex