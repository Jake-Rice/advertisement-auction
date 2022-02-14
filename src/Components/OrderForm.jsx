import React from "react"

const OrderForm = (props) => {
  return (
    <div>
        <form>
            <label> Current Price: {props.price}</label>
            <input type="button" value="Buy Now" onClick={() => {props.submit("ad text", "image url", "link url", props.price)}}/>
        </form>
    </div>
  )
}

export default OrderForm