import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { ethers } from 'ethers';
const { abi } = require("../abi");

function Launches() {
  const [launches, setLaunches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokensToPurchase, setTokensToPurchase] = useState(0);
  const [selectedToken, setSelectedToken] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    const fetchActiveLaunches = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(process.env.REACT_APP_LAUNCHPAD_CONTRACT_ADDRESS, abi, provider);
        
        const activeLaunches = await contract.getActiveLaunches();
        const formattedLaunches = activeLaunches.map(launch => ({
          id: launch.id.toString(),
          name: launch.tokenName,
          symbol: launch.tokenSymbol,
          description: launch.description,
          tokensAvailable: (launch.totalTokens.sub(launch.tokensSold)).toString(),
          tokensClaimed: launch.tokensSold.toString(),
          totalTokens: launch.totalTokens.toString(),
          deadline: new Date(launch.deadline.toNumber() * 1000).toLocaleDateString(),
          costPerToken: ethers.utils.formatEther(launch.costPerToken),
          participants: launch.participantCount.toString(),
          contractAddress: launch.tokenContractAddress,
        }));
        const formattedLaunchesReverse = formattedLaunches.reverse()

        setLaunches(formattedLaunchesReverse);
      } catch (error) {
        console.error('Error fetching active launches:', error);
      }
    };

    fetchActiveLaunches();
  }, []);

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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(process.env.REACT_APP_LAUNCHPAD_CONTRACT_ADDRESS, abi, signer);

      const cost = ethers.utils.parseEther((tokensToPurchase * parseFloat(selectedToken.costPerToken)).toString());


      const transaction = await contract.purchaseToken(selectedToken.id, tokensToPurchase, {
        value: cost,
      });

      await transaction.wait();

      setTransactionHash(transaction.hash);
      alert(`Transaction Hash: ${transaction.hash}`);
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
              const percentageClaimed = (parseFloat(launch.tokensClaimed) / parseFloat(launch.totalTokens)) * 100;
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
            <p>Estimated Cost: {tokensToPurchase * parseFloat(selectedToken.costPerToken)} ETH</p>
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
  maxWidth: '1200px',
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
  lineHeight: '25px',
});

const buttonStyle = {
  fontSize: '16px',
  padding: '10px 20px',
  color: 'white',
  backgroundColor: 'orangered',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

const modalStyle = {
  position: 'fixed',
  zIndex: 1,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgba(0,0,0,0.4)',
};

const modalContentStyle = {
  backgroundColor: 'black',
  color: 'white',
  margin: '15% auto',
  padding: '20px',
  border: '1px solid #888',
  width: '80%',
  maxWidth: '500px',
  textAlign: 'center',
  borderRadius: '10px',
};

const modalCloseStyle = {
  color: '#aaa',
  float: 'right',
  fontSize: '28px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const CreateButtonStyle = {
  fontSize: '16px',
  padding: '10px 20px',
  color: 'black',
  backgroundColor: 'limegreen',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};
