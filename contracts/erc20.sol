// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC20 is ERC20, Ownable {

    uint8 decimalValue;
    
    constructor(uint256 initialSupply, uint8 _decimalValue, string memory name, string memory symbol, address premint_address) ERC20(name, symbol) {
        decimalValue = _decimalValue;
        _mint(premint_address, initialSupply);
    }


    function decimals() public view virtual override returns (uint8) {
        return decimalValue;
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}