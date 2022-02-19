import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'

import { ethers } from 'ethers'
import AdAuction from '../../artifacts/contracts/AdAuction.sol/AdAuction.json'
const contractAddress = '0x571b321ee46B1eDab148E5160D04d2C687ee8295'

import Ad from './Ad'
import OrderForm from './OrderForm'

import './adContainer.css'

const AdContainer = () => {
    const [ad, setAd] = useState(["", "", ""])
    const [showOrderForm, toggleShowOrderForm] = useState(false)

    //infura endpoint to read ad data without connecting a wallet
    const infura = "https://rinkeby.infura.io/v3/e98214b47f724efdb547ad61975384ba"
    
    useEffect(() => {
        const provider = new ethers.providers.JsonRpcProvider(infura)
        const contract = new ethers.Contract(contractAddress, AdAuction.abi, provider)
        getAd(contract)
        contract.on("adPurchased", async (purchasePrice) => {
            getAd(contract)
        })
    }, [])

    const getAd = async (contract) => {
        const adText = await contract.adText()
        const adImageUrl = await contract.adImageUrl()
        const adLinkUrl = await contract.adLinkUrl()
        setAd([adText, adImageUrl, adLinkUrl])
    }

    const handleOrder = () => {
        toggleShowOrderForm(!showOrderForm)
    }

    const handleSubmit = (contract) => {
        toggleShowOrderForm(false)
    }

    return (
        <div>
            <Ad content={ad}/>
            <div className="order-button-container">
                <Button variant="text" size="small" onClick={handleOrder}>{showOrderForm ? "Cancel Order" : "Buy This Ad Space"}</Button>
            </div>
            {showOrderForm && <OrderForm submit={handleSubmit}/>}
        </div>
    )
}

export default AdContainer