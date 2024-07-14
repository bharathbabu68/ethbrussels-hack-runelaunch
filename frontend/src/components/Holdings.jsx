import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { ethers } from 'ethers';
const { abi } = require("../abi");

function Holdings() {
  const [nfts, setNFTs] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Connect to MetaMask and get the current wallet address
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        // Instantiate the BasicLaunchpad contract
        const contract = new ethers.Contract(process.env.REACT_APP_LAUNCHPAD_CONTRACT_ADDRESS, abi, provider);

        // Call the contract's getOwnedTokens function
        const result = await contract.getOwnedTokens(address);
        const tokenIds = result[0];
        const tokenContractAddresses = result[1];
        const amounts = result[2];
        const pricesBoughtFor = result[3];

        // Fetch ERC20 token information for each NFT
        const nftDataPromises = tokenContractAddresses.map(async (contractAddress, index) => {
          // Instantiate the ERC20 contract
          const erc20Contract = new ethers.Contract(contractAddress, abi, provider);
          const tokenNamePromise = erc20Contract.name();
          const tokenSymbolPromise = erc20Contract.symbol();
          const [tokenName, tokenSymbol] = await Promise.all([tokenNamePromise, tokenSymbolPromise]);

          return {
            tokenId: tokenIds[index].toNumber(),
            tokenName: `NFT #${tokenIds[index]}`,
            tokenSymbol: `NFT${tokenIds[index]}`,
            amount: amounts[index].toNumber(),
            price: ethers.utils.formatEther(pricesBoughtFor[index]), // Assuming pricesBoughtFor is in Ether (ETH)
            imageUrl: 'https://via.placeholder.com/100', // Placeholder image URL
            contractAddress: contractAddress,
            erc20TokenName: tokenName,
            erc20TokenSymbol: tokenSymbol,
          };
        });

        // Resolve all promises
        const nftData = await Promise.all(nftDataPromises);

        setNFTs(nftData);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        // Handle error, display message to user, etc.
      }
    };

    fetchData();
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    minHeight: '100vh',
    padding: '20px',
  };

  const sectionStyle = {
    maxWidth: '1200px', // Increased maxWidth for wider display
    width: '100%',
    marginTop: '20px',
    marginBottom: '30px',
  };

  const titleContainerStyle = {
    textAlign: 'left',
    marginBottom: '5px',
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'orangered',
    display: 'inline-block',
    padding: '5px 5px',
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Adjusted for three cards per row
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    border: '2px solid white',
    borderRadius: '20px',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'left',
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const cardTitleStyle = (backgroundColor) => ({
    fontSize: '24px',
    padding: '5px 10px',
    display: 'inline-block',
    marginBottom: '10px',
    color: 'white',
    backgroundColor: backgroundColor,
  });

  const cardTextStyle = {
    margin: '5px 0',
  };

  const redeemButtonStyle = {
    fontSize: '16px',
    backgroundColor: '#9E76FF',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid #9E76FF',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const handleRedeemNFT = async (tokenId, contractAddress) => {
    try {
      // Connect to Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      const contractAbi = [
        'function redeemNFT(uint256 tokenId) public payable',
      ];

      // Instantiate the contract
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      // Send transaction to redeem NFT
      const transaction = await contract.redeemNFT(tokenId);

      // Wait for transaction to be mined
      await transaction.wait();

      // Alert or update UI with success message
      alert('NFT Redeemed Successfully!');

      // Optionally update state or UI after transaction completion
    } catch (error) {
      console.error('Error redeeming NFT:', error);
      // Handle error, display message to user, etc.
    }
  };

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <section style={sectionStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>Your NFT Holdings</h1>
            <p style={{ fontSize: '18px', color: 'gray', marginTop: '-10px' }}>Viewing NFT holdings for wallet address: {walletAddress}</p>
          </div>
          <div style={gridContainerStyle}>
            {nfts.map((nft, index) => (
              <div key={index} style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <h3 style={cardTitleStyle('blue')}>{nft.tokenName}</h3>
                  <span style={{ fontSize: '18px', color: 'white', marginLeft: '10px' }}>{nft.tokenSymbol}</span>
                </div>
                <p style={cardTextStyle}><strong>Token ID:</strong> {nft.tokenId}</p>
                <p style={cardTextStyle}><strong>Amount:</strong> {nft.amount}</p>
                <p style={cardTextStyle}><strong>Price Bought:</strong> {nft.price} RBTC</p>
                <p style={cardTextStyle}><strong>Token Contract:</strong> {nft.contractAddress}</p>
                <p style={cardTextStyle}><strong>ERC20 Token Name:</strong> {nft.erc20TokenName}</p>
                <p style={cardTextStyle}><strong>ERC20 Token Symbol:</strong> {nft.erc20TokenSymbol}</p>
                <button style={redeemButtonStyle} onClick={() => handleRedeemNFT(nft.tokenId, nft.contractAddress)}>
                  Redeem NFT
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Holdings;
