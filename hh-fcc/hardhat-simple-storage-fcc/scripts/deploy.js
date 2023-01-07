// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract....")

    const simpleStorage = await SimpleStorageFactory.deploy()

    await simpleStorage.deployed()
    console.log(`contract address: ${simpleStorage.address}`)

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`current value is ${currentValue}`)

    const transactionResponse = await simpleStorage.store(10)
    await transactionResponse.wait(1)
    const updateValue = await simpleStorage.retrieve()
    console.log(`update value is ${updateValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgsParams: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then((value) => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
