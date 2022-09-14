//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./PiggyBank.sol";

contract AmountPiggyBank is PiggyBank {
    uint256 public targetAmount;

    constructor(
        address _owner,
        string memory _desc,
        uint256 _targetAmount
    ) PiggyBank(_owner, _desc) {
        targetAmount = _targetAmount;
    }

    function isWithdrawAvailable() public view override returns (bool) {
        return targetAmount < address(this).balance;
    }
}