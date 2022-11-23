import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Pawsome Snacks',
    description: 'We stock all natural, healthy Australian made pet snacks',
    keywords: 'Buy pet snacks, buy dog treats, buy pet food'
}

export default Meta