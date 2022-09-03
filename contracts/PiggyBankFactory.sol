/**
 *Submitted for verification at Etherscan.io on 2022-08-16
*/

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./AmountPiggyBank.sol";
import "./TimePiggyBank.sol";

contract PiggyBankFactory {
    mapping(address => address[]) private addressToPiggyBanks;

    function createTimePiggyBank(
        address _owner,
        string memory _desc,
        uint64 _endTime
    ) public returns (address) {
        address newTimePiggyBank = address(new TimePiggyBank(_owner, _desc, _endTime));
        addressToPiggyBanks[_owner].push(newTimePiggyBank);
        return newTimePiggyBank;
    }


    function createAmountPiggyBank(
        address _owner,
        string memory _desc,
        uint256 _targetAmount
    ) public returns (address) {
        address newAmountPiggyBank = address(new AmountPiggyBank(_owner, _desc, _targetAmount));
        addressToPiggyBanks[_owner].push(newAmountPiggyBank);
        return newAmountPiggyBank;
    }

    function getPiggyBanksByAddress(address _address) public view returns (address[] memory) {
        return addressToPiggyBanks[_address];
    }
}