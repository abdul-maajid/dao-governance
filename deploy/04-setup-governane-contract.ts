import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// @ts-ignore
import { ethers } from "hardhat";
import { ADDRESS_ZERO } from "../helper-hardhat-config";

const setupContracts: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const timeLock = await ethers.get("TimeLock", deployer);
  const governor = await ethers.get("GovernorContract", deployer);

  log("Setting up roles...");
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

  const properTx = await timeLock.grantRole(proposerRole, governor.address);
  await properTx.wait(1);
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
  await executorTx.wait(1);
  const revokeTx = await timeLock.grantRole(adminRole, deployer);
  await revokeTx.wait(1);
};

export default setupContracts;
