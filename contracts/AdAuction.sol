// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract AdAuction {
    address private owner;

    string public adText;
    string public adImageUrl;
    string public adLinkUrl;

    uint public lastPrice;
    uint public adPriceIncrement;

    constructor(string memory _adText, string memory _adImageUrl, string memory _adLinkUrl, uint _adPrice, uint _adPriceIncrement) {
        owner = msg.sender;
        setAd(_adText, _adImageUrl, _adLinkUrl);
        lastPrice = _adPrice;
        adPriceIncrement= _adPriceIncrement;
    }

    function buyAd(string memory _adText, string memory _adImageUrl, string memory _adLinkUrl) public payable {
        uint minPrice = lastPrice + adPriceIncrement;
        require(msg.value >= minPrice, "insufficient payment");
        adText = _adText;
        adImageUrl = _adImageUrl;
        adLinkUrl = _adLinkUrl;
        updatePrice(msg.value);
    }

    function setAd(string memory _adText, string memory _adImageUrl, string memory _adLinkUrl) private {
        adText = _adText;
        adImageUrl = _adImageUrl;
        adLinkUrl = _adLinkUrl;
    }

    function updatePrice(uint _payment) private {
        lastPrice = _payment;
    }

    function setPrice(uint _price) public OnlyOwner {
        lastPrice = _price;
    }

    function setIncrement(uint _increment) public OnlyOwner {
        adPriceIncrement = _increment;
    }

    modifier OnlyOwner {
        require(msg.sender == owner, 'access denied');
        _;
    }
}
