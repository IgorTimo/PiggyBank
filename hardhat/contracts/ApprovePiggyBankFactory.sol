//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./ApprovePiggyBank.sol";
import "./ObservablePiggyBankFactory.sol";

contract ApprovePiggyBankFactory is ObservablePiggyBankFactory {
    constructor(address _master) ObservablePiggyBankFactory(_master) { }

    function createApprovePiggyBank(
        address _owner,
        string memory _desc,
        address _approver
    ) public returns (address) {
        address newPiggyBank = address(new ApprovePiggyBank(_owner, _desc, _approver));
        onPiggyBankCreated(_owner, newPiggyBank);
        return newPiggyBank;
    }
}