//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./AmountPiggyBank.sol";
import "./ObservablePiggyBankFactory.sol";

contract AmountPiggyBankFactory is ObservablePiggyBankFactory {
    constructor(address _master) ObservablePiggyBankFactory(_master) { }

    function createAmountPiggyBank(
        address _owner,
        string memory _desc,
        uint256 _targetAmount
    ) public returns (address) {
        address newPiggyBank = address(new AmountPiggyBank(_owner, _desc, _targetAmount));
        onPiggyBankCreated(_owner, newPiggyBank);
        return newPiggyBank;
    }
}