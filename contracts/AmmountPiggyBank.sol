//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./PiggyBank.sol";

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