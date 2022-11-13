const { assert } = require("chai");

const KryptoBirdz = artifacts.require("./KryptoBirdz.sol");

// check for chai
require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("KryptoBirdz", async (accounts) => {
  let contract;

  describe("deployment", async () => {
    it("deployed successfully", async () => {
      contract = await KryptoBirdz.deployed();
      const address = contract.address;
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, "0x0");
    });

    it("matched name", async () => {
      const name = await contract.name();
      assert.equal(name, "KryptoBirdz");
    });

    it("matched symbol", async () => {
      const name = await contract.symbol();
      assert.equal(name, "KBIRDZ");
    });
  });
});
