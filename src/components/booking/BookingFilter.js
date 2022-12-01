import React from "react"
import Select from 'react-select'

// THIS IS FOR VERSION TWO - it will filter by date

const BookingFilter = ({ msgAlert, filterParam, setFilterParam }) => {
    const filterOptions = [
        { value: 'all', label: 'All' },
        // { value: 'dog_walking', label: 'Dog Walkers' },
        // { value: 'pet_sitting', label: 'Pet Sitters' },
        // { value: 'dog', label: 'Dog' },
        // { value: 'cat', label: 'Cat' },
        // { value: 'small_animal', label: 'Small Animal' },
        // { value: 'reptile', label: 'Reptile' },
        // { value: 'bird', label: 'Bird' }
    ]


    return (
        <Select
            placeholder='Filter'
            defaultValue={filterParam}
            className='basic-single text-dark'
            classNamePrefix='select'
            closeMenuOnSelect={true}
            isSearchable={false}
            options={filterOptions}
            onChange={(e) => setFilterParam(e.value)}
        />
    )
}

export default BookingFilter