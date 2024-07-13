import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
const ethers = require("ethers")

function Launches() {
  const [launches, setLaunches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokensToPurchase, setTokensToPurchase] = useState(0);
  const [selectedToken, setSelectedToken] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          name: 'Token1',
          symbol: 'TKN1',
          description: 'Description for Token1',
          tokensAvailable: 100000,
          tokensClaimed: 50000,
          totalTokens: 150000,
          deadline: '2024-12-31',
          costPerToken: 0.01,
          participants: 1200,
          contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee402', // Example contract address
        },
        {
          name: 'Token2',
          symbol: 'TKN2',
          description: 'Description for Token2',
          tokensAvailable: 500000,
          tokensClaimed: 250000,
          totalTokens: 1000000,
          deadline: '2024-11-30',
          costPerToken: 0.05,
          participants: 850,
          contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee403', // Example contract address
        },
        {
          name: 'Token3',
          symbol: 'TKN3',
          description: 'Description for Token3',
          tokensAvailable: 750000,
          tokensClaimed: 400000,
          totalTokens: 1150000,
          deadline: '2024-10-15',
          costPerToken: 0.03,
          participants: 1100,
          contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee404', // Example contract address
        },
        {
          name: 'Token4',
          symbol: 'TKN4',
          description: 'Description for Token4',
          tokensAvailable: 750000,
          tokensClaimed: 400000,
          totalTokens: 1150000,
          deadline: '2024-10-15',
          costPerToken: 0.03,
          participants: 1100,
          contractAddress: '0xb4711efc038b485b1a909b20a9cb02024b6ee405', // Example contract address
        },
      ];
      setLaunches(data);
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

  const cardSymbolStyle = {
    fontSize: '18px',
    padding: '5px 10px',
    color: 'white',
    backgroundColor: 'gray',
    borderRadius: '5px',
  };

  const cardTextStyle = {
    margin: '5px 0',
  };

  const contractLinkStyle = {
    fontSize: '14px',
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  const progressBarContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    height: '25px',
    marginTop: '10px',
  };

  const progressBarStyle = (percentage) => ({
    width: `${percentage}%`,
    backgroundColor: 'limegreen',
    height: '100%',
    textAlign: 'center',
    color: 'black',
    lineHeight: '25px', // Center the text vertically
  });

  const buttonStyle = {
    fontSize: '16px',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid white',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const CreateButtonStyle = {
    fontSize: '20px',
    backgroundColor: '#9E76FF',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid #9E76FF',
    cursor: 'pointer',
    marginTop: '10px',
    marginLeft: '80%',
  };

  const modalStyle = {
    display: 'block',
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  };

  const modalContentStyle = {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '30%', // Adjusted width to make the modal smaller
  };

  const modalCloseStyle = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const handleContractLinkClick = (contractAddress) => {
    const blockExplorerUrl = `https://explorer.testnet.rootstock.io/address/${contractAddress}`;
    window.open(blockExplorerUrl, '_blank');
  };

  const handleCreateNewLaunch = () => {
    window.location.href = '/create-new-launch';
  };

  const handlePurchaseToken = (launch) => {
    setSelectedToken(launch);
    setIsModalOpen(true);
    setTokensToPurchase(0); // Reset tokensToPurchase when opening the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTokensToPurchase(0); // Reset tokensToPurchase when closing the modal
  };

  const handleConfirmPurchase = async () => {
    try {
      // Connect to Metamask
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      const contractAddress = selectedToken.contractAddress;
      const contractAbi = ['function purchaseTokens(uint256 amount) public payable'];

      // Instantiate the contract
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      // Calculate cost
      const cost = ethers.utils.parseEther((tokensToPurchase * selectedToken.costPerToken).toString());

      // Send transaction
      const transaction = await contract.purchaseTokens(tokensToPurchase, {
        value: cost,
      });

      // Wait for transaction to be mined
      await transaction.wait();

      // Transaction hash received
      setTransactionHash(transaction.hash);

      // Alert with the transaction hash
      alert(`Transaction Hash: ${transaction.hash}`);

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error processing transaction:', error);
      // Handle error, display message to user, etc.
    }
  };

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <section style={sectionStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>Active Launches</h1>
          </div>
          <button style={CreateButtonStyle} onClick={handleCreateNewLaunch}>
            Create New Launch
          </button>
          <div style={gridContainerStyle}>
            {launches.map((launch, index) => {
              const percentageClaimed = (launch.tokensClaimed / launch.totalTokens) * 100;
              return (
                <div key={index} style={cardStyle}>
                  <div style={cardHeaderStyle}>
                    <h3 style={cardTitleStyle('blue')}>{launch.name}</h3>
                    <span style={cardSymbolStyle}>{launch.symbol}</span>
                  </div>
                  <p style={cardTextStyle}><strong>Description:</strong> {launch.description}</p>
                  <p style={cardTextStyle}><strong>Total Tokens:</strong> {launch.totalTokens}</p>
                  <p style={cardTextStyle}><strong>Tokens Available:</strong> {launch.tokensAvailable}</p>
                  <p style={cardTextStyle}><strong>Tokens Claimed:</strong> {launch.tokensClaimed}</p>
                  <p style={cardTextStyle}><strong>Participants:</strong> {launch.participants}</p>
                  <p style={cardTextStyle}><strong>Deadline:</strong> {launch.deadline}</p>
                  <p style={cardTextStyle}><strong>Cost Per Token:</strong> {launch.costPerToken} ETH</p>
                  <div style={progressBarContainerStyle}>
                    <div style={progressBarStyle(percentageClaimed)}>
                      {`${percentageClaimed.toFixed(2)}% Claimed`}
                    </div>
                  </div>
                  <p style={{ marginTop: '10px' }}>
                    <span
                      style={contractLinkStyle}
                      onClick={() => handleContractLinkClick(launch.contractAddress)}
                    >
                      View Contract Address
                    </span>
                  </p>
                  <button style={buttonStyle} onClick={() => handlePurchaseToken(launch)}>
                    Purchase Token
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <span style={modalCloseStyle} onClick={handleCloseModal}>&times;</span>
            <h2>Purchase {selectedToken.name} Tokens</h2>
            <p><strong>Description:</strong> {selectedToken.description}</p>
            <p><strong>Total Tokens:</strong> {selectedToken.totalTokens}</p>
            <p><strong>Cost Per Token:</strong> {selectedToken.costPerToken} ETH</p>
            <p><strong>Tokens Available:</strong> {selectedToken.tokensAvailable}</p>
            <input
              type="number"
              value={tokensToPurchase}
              onChange={(e) => setTokensToPurchase(parseInt(e.target.value))}
              style={{ marginBottom: '10px', padding: '5px' }}
            />
            <p>Estimated Cost: {tokensToPurchase * selectedToken.costPerToken} ETH</p>
            <button style={buttonStyle} onClick={handleConfirmPurchase}>
              Confirm Purchase
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Launches;
