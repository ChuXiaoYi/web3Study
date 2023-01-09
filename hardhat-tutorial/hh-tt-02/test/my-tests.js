const { expect } = require("chai");
const hre = require("hardhat");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

describe("Lock", function () {
  //   it("Should set the right unlockTime", async function () {
  //     const lockedAmount = 1_000_000_000;
  //     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  //     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  //     // deploy a lock contract where funds can be withdrawn
  //     // one year in the future
  //     const Lock = await hre.ethers.getContractFactory("Lock");
  //     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  //     // assert that the value is correct
  //     expect(await lock.unlockTime()).to.equal(unlockTime);
  //   });

  //   it("Should revert with the right error if called too soon", async function () {
  //     const lockedAmount = 1_000_000_000;
  //     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  //     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  //     // deploy a lock contract where funds can be withdrawn
  //     // one year in the future
  //     const Lock = await hre.ethers.getContractFactory("Lock");
  //     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  //     // assert withdraw
  //     await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
  //   });

  //   it("Should transfer the funds to the owner", async function () {
  //     const lockedAmount = 1_000_000_000;
  //     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  //     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  //     // deploy a lock contract where funds can be withdrawn
  //     // one year in the future
  //     const Lock = await hre.ethers.getContractFactory("Lock");
  //     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  //     await time.increaseTo(unlockTime);

  //     // this will throw if the transaction reverts
  //     await lock.withdraw();
  //   });

  //   it("Should revert with the right error if called from another account", async function () {
  //     const lockedAmount = 1_000_000_000;
  //     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  //     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  //     // deploy a lock contract where funds can be withdrawn
  //     // one year in the future
  //     const Lock = await hre.ethers.getContractFactory("Lock");
  //     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  //     const [owner, otherAccount] = await ethers.getSigners();

  //     // we increase the time of the chain to pass the first check
  //     await time.increaseTo(unlockTime);

  //     // We use lock.connect() to send a transaction from another account
  //     await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //       "You aren't the owner"
  //     );
  //   });

  async function deployOneYearLockFixture() {
    const lockedAmount = 1_000_000_000;
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount };
  }

  it("Should set the right unlockTime", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

    // assert that the value is correct
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });

  it("Should revert with the right error if called too soon", async function () {
    const { lock } = await loadFixture(deployOneYearLockFixture);

    await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
  });

  it("Should transfer the funds to the owner", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

    await time.increaseTo(unlockTime);

    // this will throw if the transaction reverts
    await lock.withdraw();
  });

  it("Should revert with the right error if called from another account", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

    const [owner, otherAccount] = await ethers.getSigners();

    // we increase the time of the chain to pass the first check
    await time.increaseTo(unlockTime);

    // We use lock.connect() to send a transaction from another account
    await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
      "You aren't the owner"
    );
  });
});
