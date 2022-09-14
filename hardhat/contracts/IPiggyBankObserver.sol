//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IPiggyBankObserver {
    function handlePiggyBankCreated(
        address _owner,
        address _newPiggyBank
    ) external;
}