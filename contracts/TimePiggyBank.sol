//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './PiggyBank.sol';

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