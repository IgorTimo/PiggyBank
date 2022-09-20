# Piggy Bank (Solidity)

Piggy Bank is a set of the following interacting contracts:
* [`Master`](./contracts/PiggyBankMaster.sol) contract that is the core of the system
* Factories that are able to produce Piggy Banks of their specific type and notify Master about each new creation
* Piggy Banks of various types created by their Factories

The idea is to make it possible to introduce new Piggy Bank types without need to affect source code of contracts that were already deployed. In order to achieve that, it's enough to develop and deploy a new Factory contract that is able to create Piggy Banks of a new type, and register the new Factory in the Master.

## Hardhat deploy

Command that deploys [`Master`](./contracts/PiggyBankMaster.sol) contract to Rinkeby network:
```sh
npx hardhat --network rinkeby run scripts/deploy.js
```

## Hardhat tasks

To get help on a task, run the command in the [`hardhat`](/hardhat/) directory:
```sh
cd hardhat
npx hardhat help {task-name}
```

For instance, the following command prints help for the [`add-factory`](#add-factory) task:
```sh
npx hardhat help add-factory
```

### `add-factory`

Creates a new Factory and registers it in [`Master`](./contracts/PiggyBankMaster.sol). Returns the address of the Factory created.

Example:
```sh
npx hardhat --network rinkeby add-factory --factory-name AmountPiggyBankFactory --master-address 0x86b85d9b3e9f3Dc0A7803286ad32A78c43aD3215 --piggy-bank-type "Amount 001"
```

### `verify-piggy-bank-at-etherscan`

Verifies and publishes Piggy Bank source code. A new Piggy Bank contract will be deployed in order to link the sources to it.

Please specify etherscan API key in the `etherscan.apiKey.rinkeby` setting in the [hardhat.config.js](./hardhat.config.js) file before running the task. Please follow [official instructions](https://info.etherscan.com/etherscan-developer-api-key/) to get the key.

Example:
```sh
npx hardhat --network rinkeby verify-piggy-bank-at-etherscan --factory-address 0xB5EBdf51651D0d1a5E9b03c703fF1bBB2e3A4189 --factory-name AmountPiggyBankFactory --master-address 0x86b85d9b3e9f3Dc0A7803286ad32A78c43aD3215 --piggy-bank-name AmountPiggyBank --create-method "createAmountPiggyBank(address,string,uint256)" --create-arg-list "0x86b85d9b3e9f3Dc0A7803286ad32A78c43aD3215;Amount Piggy Bank #001;1001"
```

### `add-factory-and-verify-piggy-bank-at-etherscan`

Combines [`add-factory`](#add-factory) and [`verify-piggy-bank-at-etherscan`](#verify-piggy-bank-at-etherscan) tasks. It creates a new Factory and registers it in [`Master`](./contracts/PiggyBankMaster.sol), and then verifies and publishes Piggy Bank source code.

Please specify etherscan API key in the `etherscan.apiKey.rinkeby` setting in the [hardhat.config.js](./hardhat.config.js) file before running the task. Please follow [official instructions](https://info.etherscan.com/etherscan-developer-api-key/) to get the key.

Example:
```sh
npx hardhat --network rinkeby add-factory-and-verify-piggy-bank-at-etherscan --piggy-bank-name AmountPiggyBank --factory-name AmountPiggyBankFactory --piggy-bank-type "Amount 002" --master-address 0x86b85d9b3e9f3Dc0A7803286ad32A78c43aD3215 --create-method "createAmountPiggyBank(address,string,uint256)" --create-arg-list "0x86b85d9b3e9f3Dc0A7803286ad32A78c43aD3215;Amount Piggy Bank #001;1001"
```