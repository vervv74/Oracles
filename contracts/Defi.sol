// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6 ;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol";
interface UniswapForks {
     function getAmountsOut(uint256 amountIn, address[] memory path)
        external
        view
        returns (uint256[] memory amounts);
           function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

contract Defi {
    function transferFrom(
        address _token,
        address sender,
        address dst,
        uint256 wad
    ) public returns (bool) {
        // if contract is msg.sender but not sender
        console.log("transfer %s", wad);
        return IERC20(_token).transferFrom(sender, dst, wad);
    }

       function poolAdress(
        address _token0,
        address _token1,
        address factory,
        uint24 _fee
    ) external view returns (address poolAddress) {
           PoolAddress.PoolKey memory poolKey = PoolAddress.PoolKey({
            token0: _token0,
            token1: _token1,
            fee: _fee
        });
        address _poolAddress = PoolAddress.computeAddress(factory, poolKey);
        console.log("pooladdress %s", _poolAddress);
        return _poolAddress;
    }
     function getAmountsOut(
        uint256 amountIn,
        address token0,
        address token1,
        address Router
    ) public view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = address(token0);
        path[1] = address(token1);
        uint256[] memory amounts = UniswapForks(Router).getAmountsOut(
            amountIn,
            path
        );
        //console.log("amount0 %s", amounts[0]);
        //console.log("amount1 %s", amounts[1]);
        return amounts[1];
    }
    function swapExactTokenForTokens(
        uint256 amountIn,
        address token0,
        address token1,
        address Router    
    ) public returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = token0;
        path[1] = token1;
        IERC20(token0).approve(Router, amountIn);
        uint256[] memory amounts = UniswapForks(Router)
            .swapExactTokensForTokens(
                amountIn,
                0,
                path,
                address(this),
                block.timestamp + 1000
            );
        console.log("amountout %s", amounts[1]);
        return amounts[1];
    }
   function _msg() public view returns (address) {
        address qwe = msg.sender;
        console.log("msg.sender %s", qwe);
        return qwe;
    }

}
