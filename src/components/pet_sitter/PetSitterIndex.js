
import React, { useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { petSitterIndex } from '../../api/petSitter'
import PetSitterFilter from './PetSitterFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons'

const linkStyle = {
    color: 'black',
    textDecoration: 'none'
}
const PetSitterIndex = ({ user, msgAlert }) => {

    const [allPetSitters, setAllPetSitters] = useState([])
    const [filterParam, setFilterParam] = useState('all')

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

    const petSitterCards = () => {
        let filteredResults = allPetSitters
        if (filterParam !== 'all') {
            filteredResults = allPetSitters.filter(petSitter => {
                return petSitter[`${filterParam}`] === true
            })
        }
        return filteredResults.map(petSitter => (
            <Link to={`/petsitters/${petSitter.owner}`} style={linkStyle}>
                <Card key={petSitter.Owner} style={{ width: 'auto', margin: 10, backgroundColor: '#afc2f2' }}>
                    <Card.Body>
                        <Image src='https://i.imgur.com/2y0Ysu1.jpg' className='profile-pic float-start border'></Image>
                        <Card.Text>
                            <h3 className='mb-2'>{petSitter.first_name} {petSitter.last_name}</h3>

                            {
                                petSitter.dog_walking
                                    ?
                                    <p>Dog Walker</p>
                                    :
                                    null
                            }
                            {
                                petSitter.pet_sitting
                                    ?
                                    <p>Pet Sitter</p>
                                    :
                                    null
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        ))
    }


    return (
        <div className='container-md'>
            <h3 className='text-center my-2 page-heading'>Find the Perfect Sitter for Your Pet</h3>
            <div className='d-flex justify-content-around'>
                <Link className='link' to='create'>
                <FontAwesomeIcon icon={faFeatherPointed} size='lg' className='icon' /> Register to be a Pet Sitter
                </Link>
                <div style={{ width: '300px' }}>
                <PetSitterFilter
                    filterParam={filterParam}
                    setFilterParam={setFilterParam}
                />
                </div>
            </div>
            <div className='container-md mt-2 pet-sitter-index'>

                {petSitterCards()}

            </div>

        </div>
    )
}

export default PetSitterIndex


