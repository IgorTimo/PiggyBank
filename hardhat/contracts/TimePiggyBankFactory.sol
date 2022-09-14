//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./TimePiggyBank.sol";
import "./ObservablePiggyBankFactory.sol";

contract TimePiggyBankFactory is ObservablePiggyBankFactory {
    constructor(address _master) ObservablePiggyBankFactory(_master) { }

    function createTimePiggyBank(
        address _owner,
        string memory _desc,
        uint64 _endTime
    ) public returns (address) {
        address newPiggyBank = address(new TimePiggyBank(_owner, _desc, _endTime));
        onPiggyBankCreated(_owner, newPiggyBank);
        return newPiggyBank;
    }
}