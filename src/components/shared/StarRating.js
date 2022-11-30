import React from 'react'
import { Rate } from 'antd'

const StarRating = ({ value, style }) => {
    return (
        <Rate
            allowHalf
            disabled
            value={value}
            style={style}
        />
    )
}

export default StarRating