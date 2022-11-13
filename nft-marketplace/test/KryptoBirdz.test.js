const { assert } = require("chai");

const KryptoBirdz = artifacts.require("./KryptoBirdz.sol");

// check for chai
require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("KryptoBirdz", async (accounts) => {
  let contract;

  before(async () => {
    contract = await KryptoBirdz.deployed();
  });

  describe("deployment", async () => {
    it("deployed successfully", async () => {
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

  describe("minting", async () => {
    it("create a new token", async () => {
      const result = await contract.mint("https...1");
      const totalSupply = await contract.totalSupply();
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      assert.equal(event._from, "0x0000000000000000000000000000000000000000");
      assert.equal(event._to, accounts[0]);

      await contract.mint("https...1").should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("lists KryptoBirdz", async () => {
      await contract.mint("https...2");
      await contract.mint("https...3");
      await contract.mint("https...4");
      const totalSupply = await contract.totalSupply();

      let result = [];
      let KryptoBird;

      for (let i = 0; i < totalSupply; i++) {
        KryptoBird = await contract.kryptoBirds(i);
        result.push(KryptoBird);
      }

      let expected = ["https...1", "https...2", "https...3", "https...4"];
      assert.equal(result.join(","), expected.join(","));
    });
  });
});
