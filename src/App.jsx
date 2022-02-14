import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import AdAuction from '../artifacts/contracts/AdAuction.sol/AdAuction.json'
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

import OrderForm from './Components/OrderForm'

const App = () => {
    const [ad, setAd] = useState(["t", "i", "l"])
    const [showOrderForm, toggleShowOrderForm] = useState(false)
    const [price, setPrice] = useState("")

    useEffect(() => {
        getAdPrice().then(data => setPrice(data))
    })

    const getAd = async (event) => {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(contractAddress, AdAuction.abi, provider)
        const adText = await contract.adText()
        const adImageUrl = await contract.adImageUrl()
        const adLinkUrl = await contract.adLinkUrl()
        setAd([adText, adImageUrl, adLinkUrl])
    }

    const getAdPrice = async () => {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(contractAddress, AdAuction.abi, provider)
        const lastPrice = await contract.lastPrice()
        const increment = await contract.adPriceIncrement()
        const newPrice = lastPrice.add(increment).toString()
        return newPrice
    }

    const handleSubmit = async (text, image, link, price) => {
        const provider = new ethers.providers.JsonRpcProvider()
        const signer = provider.getSigner(0)
        const contract = new ethers.Contract(contractAddress, AdAuction.abi, signer)
        let tx = await contract.buyAd(text, image, link, {value: price})
        getAdPrice().then((data) => {setPrice(data)})
        await getAd()
    }

    return (
        <div>
            <p>Price: {price}</p>
            <div className="ad">
                <p>{ad[0]}</p>
                <p>{ad[1]}</p>
                <p>{ad[2]}</p>
            </div>
            <input type="button" value="Refresh Ad" onClick={getAd}/>
            <input type="button" value="Change Ad" onClick={()=>{toggleShowOrderForm(!showOrderForm)}}/>
            {showOrderForm && <OrderForm price={price} submit={handleSubmit}/>}
        </div>
    )
}

export default App