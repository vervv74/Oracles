 // SPDX-License-Identifier: MIT

pragma solidity ^0.8.0 ;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract Chainlink {
    function getLatestPrice(address pool) public view returns (int256 ) {
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = AggregatorV3Interface(pool)
                .latestRoundData();
        console.log("rate %s", uint256(price));
        return price;
    }
       
}
