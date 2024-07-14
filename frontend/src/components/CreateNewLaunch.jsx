import React, { useState } from 'react';
import NavBar from './NavBar';
const ethers = require("ethers");

function CreateNewLaunch() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [totalTokens, setTotalTokens] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [costPerToken, setCostPerToken] = useState(0);
  const [contractAddress, setContractAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

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
    maxWidth: '800px', // Adjusted maxWidth for the form layout
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

  const formContainerStyle = {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    marginTop: '20px',
  };

  const formRowStyle = {
    marginBottom: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'black',
    color: 'white',
  };

  const buttonStyle = {
    fontSize: '20px',
    backgroundColor: '#9E76FF',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid #9E76FF',
    cursor: 'pointer',
    marginTop: '20px',
    alignSelf: 'flex-start',
  };

  const handleSubmit = async () => {
    try {
      // Connect to Metamask
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      const contractAbi = [
        'function createNewLaunch(string name, string symbol, string description, uint256 totalTokens, string deadline, uint256 costPerToken) public payable',
      ];

      const contractAddress = ''; 
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      // Send transaction
      const transaction = await contract.createNewLaunch(
        tokenName,
        tokenSymbol,
        description,
        totalTokens,
        deadline,
        ethers.utils.parseEther(costPerToken.toString())
      );

      // Wait for transaction to be mined
      await transaction.wait();

      // Transaction hash received
      setTransactionHash(transaction.hash);

      // Alert with the transaction hash or update UI as needed
      alert(`Transaction Hash: ${transaction.hash}`);

      // Optionally clear form inputs or show success message
      setTokenName('');
      setTokenSymbol('');
      setDescription('');
      setTotalTokens(0);
      setDeadline('');
      setCostPerToken(0);
      setContractAddress('');

    } catch (error) {
      console.error('Error creating new launch:', error);
      // Handle error, display message to user, etc.
    }
  };

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
        <section style={sectionStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>Create New Launch</h1>
          </div>
          <div style={formContainerStyle}>
            <div style={formRowStyle}>
              <label htmlFor="tokenName">Token Name:</label>
              <input
                type="text"
                id="tokenName"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={formRowStyle}>
              <label htmlFor="tokenSymbol">Token Symbol:</label>
              <input
                type="text"
                id="tokenSymbol"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={formRowStyle}>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, height: '100px' }}
              />
            </div>
            <div style={formRowStyle}>
              <label htmlFor="totalTokens">Total Tokens:</label>
              <input
                type="number"
                id="totalTokens"
                value={totalTokens}
                onChange={(e) => setTotalTokens(parseInt(e.target.value))}
                style={inputStyle}
              />
            </div>
            <div style={formRowStyle}>
              <label htmlFor="deadline">Deadline:</label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={formRowStyle}>
              <label htmlFor="costPerToken">Cost Per Token (in RBTC):</label>
              <input
                type="number"
                id="costPerToken"
                value={costPerToken}
                onChange={(e) => setCostPerToken(parseFloat(e.target.value))}
                style={inputStyle}
              />
            </div>
            <div style={formRowStyle}>
              <label htmlFor="contractAddress">Contract Address:</label>
              <input
                type="text"
                id="contractAddress"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                style={inputStyle}
              />
            </div>
            <button style={buttonStyle} onClick={handleSubmit}>
              Create Launch
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default CreateNewLaunch;