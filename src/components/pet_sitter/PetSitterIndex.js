
import React, { useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { petSitterIndex } from '../../api/petSitter'
import PetSitterFilter from './PetSitterFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherPointed, faDog, faCat, faFish, faDove, faWorm } from '@fortawesome/free-solid-svg-icons'

const linkStyle = {
    color: 'black',
    textDecoration: 'none'
}
const PetSitterIndex = ({ user, msgAlert }) => {

    const [allPetSitters, setAllPetSitters] = useState([])
    const [filterParam, setFilterParam] = useState('all')
    // const [profileExists, setProfileExists] = useState(false)


    useEffect(() => {
        petSitterIndex(user)
            .then(res => {
                // console.log(res.data)
                setAllPetSitters(res.data.pet_sitters)
                // if (user) {
                //    setProfileExists(res.data.pet_sitters.includes(res.data.pet_sitters.owner === user.id)) 
                // }   
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
                        <Image src='/defaultProfilePic.jpg' alt='profile pic' className='profile-pic float-start border'></Image>
                        <Card.Text>
                            <h3 className='mb-2'>{petSitter.first_name} {petSitter.last_name}</h3>
                            <div className='row'>
                                <div className='col'>
                                    {petSitter.pet_sitting ? <p>Pet Sitter</p> : null}
                                </div>
                                <div className='col'>
                                    {petSitter.dog_walking ? <p>Dog Walker </p> : null}
                                </div>
                                <div className='d-flex'>
                                    {petSitter.dog ? <FontAwesomeIcon icon={faDog} size='xl' className='icon' /> : null}
                                    {petSitter.cat ? <FontAwesomeIcon icon={faCat} size='xl' className='icon' /> : null}
                                    {petSitter.small_animal ? <FontAwesomeIcon icon={faFish} size='xl' className='icon' /> : null}
                                    {petSitter.reptile ? <FontAwesomeIcon icon={faDove} size='xl' className='icon' /> : null}
                                    {petSitter.bird ? <FontAwesomeIcon icon={faWorm} size='xl' className='icon' /> : null}
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        ))
    }



    return (
        <div className='container-md'>
            <h3 className='text-center my-3 page-heading'>Find the Perfect Sitter for Your Pet</h3>
            <div className='d-flex justify-content-around'>
                {/* {
                    user && { profileExists } ?
                        null
                        : */}
                <Link className='link' to='create'>
                    <FontAwesomeIcon icon={faFeatherPointed} size='lg' className='icon' /> Become a Pet Sitter
                </Link>
                {/* } */}
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


