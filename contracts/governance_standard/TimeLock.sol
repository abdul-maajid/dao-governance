// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    // mindelay: How long you have to wait before executing
    // list of propsers: list of proposers
    constructor(
        uint256 minDelay,
        address[] memory propseers,
        address[] memory executers
    ) TimelockController(minDelay, propseers, executers) {}
}
