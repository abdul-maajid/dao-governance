import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  VOTING_PERIOD,
  VOTING_DELAY,
  QUORUM_PERCENTAGE,
} from "../helper-hardhat-config";

const deployGovernorContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");

  log("Deploying Governor Contract...");
  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_PERIOD,
      VOTING_DELAY,
      QUORUM_PERCENTAGE,
    ],
    log: true,
  });
};

export default deployGovernorContract;
