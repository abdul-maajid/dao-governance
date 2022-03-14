import {
  DEVELOPMENT_CHAINS,
  proposalsFile,
  VOTING_PERIOD,
} from "../helper-hardhat-config";
import * as fs from "fs";
// @ts-ignore
import { network, ethers } from "hardhat";
import { moveBlocks } from "../utils/move-blocks";

const index = 0;

async function main(proposalIndex: number) {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
  // You could swap this out for the ID you want to use too
  const proposalId = proposals[network.config.chainId!][proposalIndex];
  console.log(`Proposal ID: ${proposalId}`);
  // 0=Agains, 1 = For, 2= Abstain
  const voteWay = 1;
  const voteReason = "I a like a do da cha cha";
  const governor = await ethers.getContract("GovernorContract");
  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    voteReason
  );
  await voteTxResponse.wait(1);
  if (DEVELOPMENT_CHAINS.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1);
  }
  console.log("Voted! Ready to go!!!");
}

main(index)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
