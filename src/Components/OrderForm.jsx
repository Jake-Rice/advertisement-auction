import React, {useState} from "react"

const OrderForm = (props) => {
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [link, setLink] = useState('')
    return (
        <div>
            <form>
                <label>Current Price: {props.price}</label><br/>
                <label>Ad Text: <input type="text" value={text} onChange={(event) => {setText(event.target.value)}}/></label><br/>
                <label>Image URL: <input type="text" value={image} onChange={(event) => {setImage(event.target.value)}}/></label><br/>
                <label>Link URL: <input type="text" value={link} onChange={(event) => {setLink(event.target.value)}}/></label><br/>
                <input type="button" value="Buy Now" onClick={() => {props.submit(text, image, link, props.price)}}/>
            </form>
        </div>
    )
}

export default OrderForm