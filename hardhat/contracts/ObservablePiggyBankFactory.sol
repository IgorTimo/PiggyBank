//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IPiggyBankObserver.sol";

abstract contract ObservablePiggyBankFactory {
    IPiggyBankObserver immutable observer;

    constructor(address _observer) {
        observer = IPiggyBankObserver(_observer);
    }

    function onPiggyBankCreated(
        address _owner,
        address _newPiggyBank
    ) internal {
        observer.handlePiggyBankCreated(_owner, _newPiggyBank);
    }
}