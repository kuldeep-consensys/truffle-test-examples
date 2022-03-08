// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Storage.sol";

contract TestStorage {
    Storage myContract = Storage(DeployedAddresses.Storage());

    function testInitialNumber() public {
        uint256 initialNumber = 100;
        Storage myNewContract = new Storage(initialNumber);
        Assert.equal(
            myNewContract.retrieve(),
            initialNumber,
            "Number not initialised correctly in constructor"
        );
    }

    function testStoreRetrieveNumber() public {
        uint256 newNumber = 1111;
        myContract.store(newNumber);
        Assert.equal(
            myContract.retrieve(),
            newNumber,
            "Number not stored correctly using store() method"
        );
    }
}
