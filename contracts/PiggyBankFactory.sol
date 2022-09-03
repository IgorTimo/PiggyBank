/**
 *Submitted for verification at Etherscan.io on 2022-08-16
*/

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './PiggyBank.sol';

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


    function createAmmountPiggyBank(
        address _owner,
        string memory _desc,
        uint256 _targetAmmount
    ) public returns (address) {
        address newAmmountPiggyBank = address(new AmmountPiggyBank(_owner, _desc, _targetAmmount));
        addressToPiggyBanks[_owner].push(newAmmountPiggyBank);
        return newAmmountPiggyBank;
    }

    function getPiggyBanksByAddress(address _address) public view returns (address[] memory) {
        return addressToPiggyBanks[_address];
    }
}

contract TimePiggyBank is PiggyBank {
    uint64 public endTime;

    constructor(
        address _owner,
        string memory _desc,
        uint64 _endTime
    ) PiggyBank(_owner, _desc) {
        endTime = _endTime;
    }

    function isWithdrawAvailable() public view override returns (bool) {
        return endTime < block.timestamp;
    }
}

contract AmmountPiggyBank is PiggyBank {
    uint256 public targetAmmount;

    constructor(
        address _owner,
        string memory _desc,
        uint256 _targetAmmount
    ) PiggyBank(_owner, _desc) {
        targetAmmount = _targetAmmount;
    }

    function isWithdrawAvailable() public view override returns (bool) {
        return targetAmmount < address(this).balance;
    }
}