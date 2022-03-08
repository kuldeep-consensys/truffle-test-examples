const Storage = artifacts.require("Storage");

contract("Storage", (accounts) => {
  let initialNumber = 100;
  let myContract;

  // tests go here
  before("Setup contract", async () => {
    myContract = await Storage.new(initialNumber);
  });

  let totalTransferredEther = 0;
  beforeEach("Get 1 ether before each test", async () => {
    await myContract.sendTransaction({
      from: accounts[0],
      value: await web3.utils.toWei("1", "ether"),
    });
    totalTransferredEther++;
  });

  it("Test initial number", async () => {
    let storedNumber = await myContract.retrieve();
    assert.equal(
      storedNumber,
      initialNumber,
      "Constructor and retrieve should match"
    );
  });

  it("Test store and retrieve number", async () => {
    let newNumber = 1111;
    await myContract.store(newNumber);
    let storedNumber = await myContract.retrieve();
    assert.equal(newNumber, storedNumber, "store and retrieve should match");
  });

  it("Test transfer ether", async () => {
    let balance = await web3.eth.getBalance(myContract.address);
    let totalTransferredWei = await web3.utils.toWei(
      totalTransferredEther.toString(),
      "ether"
    );
    assert.equal(
      balance,
      totalTransferredWei,
      "Total ether transferred and balance should match"
    );
  });
});
