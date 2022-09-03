/**
 *Submitted for verification at Etherscan.io on 2022-08-16
*/

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./AmmountPiggyBank.sol";
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