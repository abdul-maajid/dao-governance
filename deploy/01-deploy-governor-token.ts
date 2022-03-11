import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// @ts-ignore
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying governance token");
  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // waitConfirmations:
  });
  log("Governance token deployed at", governanceToken.address);

  await delegate(governanceToken.address, deployer);
  log("Delegated!");
};

const delegate = async (
  governanceTokenAddress: string,
  delegatedAccount: string
) => {
  const governanceToken = await ethers.getContractAt(
    "GovernanceToken",
    governanceTokenAddress
  );
  const tx = await governanceToken.delegate(delegatedAccount);
  await tx.wait(1);
  console.log(
    `Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`
  );
};

export default deployGovernanceToken;
