import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
const ethers = require("ethers");

function Holdings() {
  const [nfts, setNFTs] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // Simulated data for demonstration
    const fetchData = async () => {
      try {
        // Connect to MetaMask and get the current wallet address
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        // Simulated NFT data
        const data = [
          {
            tokenId: 1,
            tokenName: 'CryptoKitty #123',
            tokenSymbol: 'CK123',
            amount: 1,
            price: '0.1',
            imageUrl: 'https://via.placeholder.com/300', // Placeholder image URL
            contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee406', // Example contract address
          },
          {
            tokenId: 2,
            tokenName: 'Etheremon #456',
            tokenSymbol: 'EM456',
            amount: 3,
            price: '0.05',
            imageUrl: 'https://via.placeholder.com/300', // Placeholder image URL
            contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee406', // Example contract address
          },
          {
            tokenId: 3,
            tokenName: 'Axie Infinity #789',
            tokenSymbol: 'AX789',
            amount: 2,
            price: '0.03',
            imageUrl: 'https://via.placeholder.com/300', // Placeholder image URL
            contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee406', // Example contract address
          },
        ];

        setNFTs(data);
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
                <img src={nft.imageUrl} alt="NFT Image" style={{ width: '100%', marginBottom: '10px', borderRadius: '10px' }} />
                <p style={cardTextStyle}><strong>Token ID:</strong> {nft.tokenId}</p>
                <p style={cardTextStyle}><strong>Amount:</strong> {nft.amount}</p>
                <p style={cardTextStyle}><strong>Price Bought:</strong> {nft.price} RBTC</p>
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
