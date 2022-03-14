import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// @ts-ignore
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Box Contract...");
  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
  });

  const timeLock = await ethers.getContract("TimeLock", deployer);
  const boxContract = await ethers.getContractAt("Box", box.address);

  const transferOwnerTx = await boxContract.transferOwnership(timeLock.address);
  await transferOwnerTx.wait(1);

  log("You did it!!!");
};

export default deployBox;
