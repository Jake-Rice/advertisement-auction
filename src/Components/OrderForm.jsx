import React, {useState, useEffect} from "react"
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

    let provider, signer, contract

    useEffect(async () =>{
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner()
        contract = new ethers.Contract(contractAddress, AdAuction.abi, signer)
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
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner()
        contract = new ethers.Contract(contractAddress, AdAuction.abi, signer)
        let tx = await contract.buyAd(text, image, link, {value: ethers.utils.parseEther(price)})
        props.submit(contract)
    }

    return (
        <div>
            <form>
                <label>Current Price: {price} ETH</label><br/>
                <label>Account Balance: {balance} ETH</label><br/>
                <label>Ad Text: <input type="text" value={text} onChange={(event) => {setText(event.target.value)}}/></label><br/>
                <label>Image URL: <input type="text" value={image} onChange={(event) => {setImage(event.target.value)}}/></label><br/>
                <label>Link URL: <input type="text" value={link} onChange={(event) => {setLink(event.target.value)}}/></label><br/>
                <input type="button" value="Buy Now" onClick={()=>handleSubmit(text, image, link)}/>
            </form>
            <label>Preview: <Ad content={[text, image, link]}/></label>
        </div>
    )
}

export default OrderForm