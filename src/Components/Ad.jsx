import React from 'react'

const Ad = (props) => {
    const [text, image, link] = props.content
    return (
        <a href={link} target="_blank"><div className="ad">
            <img src={image}/>
            <span>{text}</span>
        </div></a>
    )
}

export default Ad