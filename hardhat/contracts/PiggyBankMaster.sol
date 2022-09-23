//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IPiggyBankObserver.sol";

contract PiggyBankMaster is IPiggyBankObserver {
    struct PiggyBankDetails {
        address piggyBankAddress;
        string piggyBankType;
    }

    mapping(address => bool) private registeredFactories;
    mapping(string => bool) private registeredPiggyBankTypes;
    mapping(address => string) private factoryTypes;

    mapping(address => PiggyBankDetails[]) piggyBanksByOwner;

    function registerPiggyBankFactory(
        string memory _piggyBankType,
        address _factory
    ) external {
        // TODO:  Add authorizatoin check.
        require(!registeredFactories[_factory], "Factory is already registered!");
        require(!registeredPiggyBankTypes[_piggyBankType], "Piggy bank type is already in use!");

        registeredFactories[_factory] = true;
        registeredPiggyBankTypes[_piggyBankType] = true;
        factoryTypes[_factory] = _piggyBankType;
    }

    function handlePiggyBankCreated(
        address _owner,
        address _newPiggyBank
    ) override external {
        require(registeredFactories[msg.sender], "Not a known factory!");

        piggyBanksByOwner[_owner].push(PiggyBankDetails({
            piggyBankAddress: _newPiggyBank,
            piggyBankType: factoryTypes[msg.sender]
        }));
    }

    function getPiggyBanksByOwner(
        address _owner
    ) external view returns (PiggyBankDetails[] memory) {
        return piggyBanksByOwner[_owner];
    }
}