// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BasicLaunchpad is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _launchIds;
    Counters.Counter private _tokenIds;
    Counters.Counter private _purchaseIds;

    struct Launch {
        uint256 id;
        string tokenName;
        string tokenSymbol;
        string description;
        uint256 totalTokens;
        uint256 deadline;
        uint256 costPerToken;
        address tokenContractAddress;
        uint256 tokensSold;
        uint256 participantCount;
    }

    struct Purchase {
        uint256 purchaseId;
        address purchaser;
        uint256 amount;
        uint256 totalCost;
        address tokenContractAddress;
        uint256 launchId;
        bool redeemed;
    }

    mapping(uint256 => Launch) public launches;
    mapping(uint256 => Purchase) public purchases;
    mapping(uint256 => uint256) public tokenIdToPurchaseId;
    mapping(address => mapping(uint256 => bool)) private _ownedTokens; // wallet address to tokenId to ownership status

    constructor(string memory collectionName, string memory symbol) ERC721(collectionName, symbol) {
    }

    function createLaunch(
        string memory tokenName,
        string memory tokenSymbol,
        string memory description,
        uint256 totalTokens,
        uint256 deadlineInDays,
        uint256 costPerToken,
        address tokenContractAddress,
        address seller
    ) external returns (uint256) {
        require(deadlineInDays > 0, "Deadline must be at least one day");
        require(totalTokens > 0, "Total tokens must be greater than zero");
        
        uint256 launchId = _launchIds.current();
        _launchIds.increment();

        uint256 deadlineTimestamp = block.timestamp + (deadlineInDays * 1 days);

        launches[launchId] = Launch({
            id: launchId,
            tokenName: tokenName,
            tokenSymbol: tokenSymbol,
            description: description,
            totalTokens: totalTokens,
            deadline: deadlineTimestamp,
            costPerToken: costPerToken,
            tokenContractAddress: tokenContractAddress,
            tokensSold: 0,
            participantCount: 0
        });

        // Transfer total tokens from seller to this contract
        IERC20 tokenContract = IERC20(tokenContractAddress);
        tokenContract.transferFrom(seller, address(this), totalTokens);

        return launchId;
    }

    function purchaseToken(uint256 launchId, uint256 amount) external payable {
        require(launchId < _launchIds.current(), "Invalid launch ID");
        Launch storage launch = launches[launchId];
        require(launch.deadline >= block.timestamp, "Launch deadline has passed");
        require(amount > 0 && launch.tokensSold + amount <= launch.totalTokens, "Invalid token amount");

        uint256 totalCost = amount * launch.costPerToken;
        require(msg.value == totalCost, "Incorrect amount sent");

        uint256 purchaseId = _purchaseIds.current();
        _purchaseIds.increment();

        purchases[purchaseId] = Purchase({
            purchaseId: purchaseId,
            purchaser: msg.sender,
            amount: amount,
            totalCost: totalCost,
            tokenContractAddress: launch.tokenContractAddress,
            launchId: launchId,
            redeemed: false
        });

        launch.participantCount++;

        _mint(msg.sender, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), tokenURI(purchaseId));

        tokenIdToPurchaseId[_tokenIds.current()] = purchaseId;
        _ownedTokens[msg.sender][_tokenIds.current()] = true;

        launch.tokensSold += amount;
        _tokenIds.increment();
    }

    function redeem(uint256 tokenId) external {
        require(_exists(tokenId), "ERC721: Token ID not exists");
        uint256 purchaseId = tokenIdToPurchaseId[tokenId];
        require(purchaseId != 0, "ERC721: Token not linked to any purchase");

        Purchase storage purchase = purchases[purchaseId];
        require(msg.sender == ownerOf(tokenId), "ERC721: Only token owner can redeem");
        require(purchase.redeemed == false, "ERC721: Token already redeemed");
        require(launches[purchase.launchId].deadline < block.timestamp, "ERC721: Cannot redeem before launch deadline");

        // Mark the purchase as redeemed
        purchase.redeemed = true;

        // Transfer ERC20 tokens back to the purchaser
        IERC20 tokenContract = IERC20(purchase.tokenContractAddress);
        tokenContract.transferFrom(address(this), msg.sender, purchase.amount);

        // Burn the ERC721 token
        _burn(tokenId);

        // Update ownership status
        _ownedTokens[msg.sender][tokenId] = false;
    }

    function editLaunchDeadline(uint256 launchId, uint256 newDeadlineTimestamp) external onlyOwner {
        require(launchId < _launchIds.current(), "Invalid launch ID");

        Launch storage launch = launches[launchId];
        require(launches[launchId].deadline >= block.timestamp, "Launch not active");

        launch.deadline = newDeadlineTimestamp;
    }

    function getActiveLaunches() external view returns (Launch[] memory) {
        uint256 activeLaunchCount = 0;
        for (uint256 i = 0; i < _launchIds.current(); i++) {
            if (launches[i].deadline >= block.timestamp) {
                activeLaunchCount++;
            }
        }

        Launch[] memory activeLaunches = new Launch[](activeLaunchCount);
        uint256 index = 0;
        for (uint256 i = 0; i < _launchIds.current(); i++) {
            if (launches[i].deadline >= block.timestamp) {
                activeLaunches[index] = launches[i];
                index++;
            }
        }

        return activeLaunches;
    }

    function getOwnedTokens(address wallet) external view returns (uint256[] memory, address[] memory, uint256[] memory, uint256[] memory) {
        uint256 tokenCount = balanceOf(wallet);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        address[] memory tokenContractAddresses = new address[](tokenCount);
        uint256[] memory amounts = new uint256[](tokenCount);
        uint256[] memory pricesBoughtFor = new uint256[](tokenCount);

        uint256 index = 0;
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if (_ownedTokens[wallet][i]) {
                tokenIds[index] = i;
                Purchase memory purchase = purchases[tokenIdToPurchaseId[i]];
                tokenContractAddresses[index] = purchase.tokenContractAddress;
                amounts[index] = purchase.amount;
                pricesBoughtFor[index] = purchase.totalCost;
                index++;
            }
        }

        return (tokenIds, tokenContractAddresses, amounts, pricesBoughtFor);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        require(ownerOf(tokenId) == msg.sender || isApprovedForAll(ownerOf(tokenId), msg.sender), "Caller is not owner nor approved");

        uint256 purchaseId = tokenIdToPurchaseId[tokenId];
        Purchase memory purchase = purchases[purchaseId];

        string memory json = string(abi.encodePacked(
            '{',
            '"purchaseId": ', toString(purchase.purchaseId), ', ',
            '"purchaser": "', toString(purchase.purchaser), '", ',
            '"amount": ', toString(purchase.amount), ', ',
            '"totalCost": ', toString(purchase.totalCost), ', ',
            '"tokenContractAddress": "', toString(purchase.tokenContractAddress), '", ',
            '"launchId": ', toString(purchase.launchId),
            '}'
        ));

        string memory base = _baseURI();
        return bytes(base).length > 0 ? string(abi.encodePacked(base, json)) : json;
    }

    function getParticipantCount(uint256 launchId) external view returns (uint256) {
        return launches[launchId].participantCount;
    }

    function toString(address account) internal pure returns (string memory) {
        return toString(abi.encodePacked(account));
    }

    function toString(uint256 value) internal pure returns (string memory) {
        return toString(abi.encodePacked(value));
    }

    function toString(bytes memory data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint(uint8(data[i] >> 4))];
            str[3 + i * 2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }
}
