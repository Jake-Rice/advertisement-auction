import React, {useState, useEffect} from "react"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { ethers } from 'ethers'
import Ad from './Ad'

import AdAuction from '../../artifacts/contracts/AdAuction.sol/AdAuction.json'
const contractAddress = '0x571b321ee46B1eDab148E5160D04d2C687ee8295'

const OrderForm = (props) => {
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [link, setLink] = useState('')

    const [balance, setBalance] = useState('')
    const [price, setPrice] = useState('')

    useEffect(async () =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, AdAuction.abi, signer)
        const balanceBN = await signer.getBalance()
        const balanceStr = balanceBN.toString()
        setBalance(balanceStr)
        const lastPrice = await contract.lastPrice()
        const increment = await contract.adPriceIncrement()
        const newPrice = lastPrice.add(increment)
        const priceStr = newPrice.toString()
        setBalance(ethers.utils.formatEther(balanceStr).toString())
        setPrice(ethers.utils.formatEther(priceStr).toString())
    }, [])

    const handleSubmit = async (text, image, link) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, AdAuction.abi, signer)
        let tx = await contract.buyAd(text, image, link, {value: ethers.utils.parseEther(price)})
        props.submit(contract)
    }

    return (
        <div>
            <form>
                <div className="display-container">
                    <label>Current Price: {price} ETH</label>
                    <label>Account Balance: {balance} ETH</label>
                </div>
                <div className="data-container">
                    <label>Ad Text: </label><TextField variant="outlined" value={text} onChange={(event) => {setText(event.target.value)}}/>
                    <label>Image URL: </label><TextField variant="outlined" value={image} onChange={(event) => {setImage(event.target.value)}}/>
                    <label>Link URL: </label><TextField variant="outlined" value={link} onChange={(event) => {setLink(event.target.value)}}/>
                </div>
                <div className="buy-button"><Button variant="contained" color="primary" onClick={()=>handleSubmit(text, image, link)}>Buy Now</Button></div>
            </form>
            <label >Preview: </label><div className="preview-container" ><Ad content={[text, image, link, false]}/></div>
        </div>
    )
}

export default OrderForm