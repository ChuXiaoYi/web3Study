const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expetedValue = 0
        assert.equal(currentValue.toString(), expetedValue)
        // expect(currentValue.toString()).to.equal(expetedValue)
    })
    it("Should update when we call store", async () => {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
