//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./PiggyBank.sol";

contract ApprovePiggyBank is PiggyBank {
    address public approver;
    bool public isApproved;

    constructor(
        address _owner,
        string memory _desc,
        address _approver
    ) PiggyBank(_owner, _desc) {
        approver = _approver;
    }

    function isWithdrawAvailable() public view override returns (bool) {
        return isApproved;
    }

    function setApproved() public {
        require(msg.sender == approver, "You are not approver!");
        isApproved = true;
    }

    function setApprover() public {
        approver = msg.sender;
    }
}