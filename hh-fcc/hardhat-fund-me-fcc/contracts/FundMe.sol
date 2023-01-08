// Get funds from users;
// Withdraw funds
// Set a minimum funding value in USD;
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8; //指定solidity的版本，因为solidity更新很频繁.^表示比当前版本更新的都可以。>=0.8.7 < 0.9.0

import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConvertor for uint256;

    uint256 public constant minimumUsed = 50 * 1e18;

    address[] funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        // want to be able to set a minimum fund amount in USD
        // 1. How do we set ETH to this contract
        require(
            msg.value.getConversionRate() >= minimumUsed,
            "Didn't send enough!"
        ); // 1e18 == 1 * 10 **18 == 10000000000000000
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public OnlyOwner {
        /* starting index, ending index, step amount */
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);

        // payable(msg.sender).transfer(address(this).balance);

        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed")

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Send failed");
    }

    modifier OnlyOwner() {
        // require(msg.sender == i_owner, "Sender is not owner!");

        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
