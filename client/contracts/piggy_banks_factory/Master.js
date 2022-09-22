import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";

const address = "0x54ccb3ED9d2eeAC98D6a616a2CEC1487E5f1c4fc";

const abi = [
    {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address"
          }
        ],
        name: "getPiggyBanksByOwner",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "piggyBankAddress",
                type: "address"
              },
              {
                internalType: "string",
                name: "piggyBankType",
                type: "string"
              }
            ],
            internalType: "struct PiggyBankMaster.PiggyBankDetails[]",
            name: "",
            type: "tuple[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address"
          },
          {
            internalType: "address",
            name: "_newPiggyBank",
            type: "address"
          }
        ],
        name: "handlePiggyBankCreated",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_piggyBankType",
            type: "string"
          },
          {
            internalType: "address",
            name: "_factory",
            type: "address"
          }
        ],
        name: "registerPiggyBankFactory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
];

//const Master = new ethers.Contract(address, abi, defaultProvider);

const piggyBankMaster = new ethers.Contract(address, abi, defaultProvider);

export default piggyBankMaster;