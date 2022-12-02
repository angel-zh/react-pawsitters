import React from "react"
import Select from 'react-select'

// THIS IS FOR VERSION TWO - it will filter by date

const BookingFilter = ({ filterParam, setFilterParam }) => {
    const filterOptions = [
        { value: 'all', label: 'All' },
        
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