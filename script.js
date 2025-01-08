// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const connectButton = document.getElementById('connectButton');
  const statusMessage = document.getElementById('statusMessage');
  
  /**
   * Connect to MetaMask wallet and send donation
   */
  async function connectAndDonate() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('Connected account:', account);
        statusMessage.textContent = `Connected account: ${account}`;
        statusMessage.className = 'mt-6 text-green-400';
        
        // Define the transaction parameters
        const txParams = {
          from: account,
          to: "0x62f1F6bFE3A798d5023608ac0a9c8a9538276283", // Replace with your desired donation address
          value: "0x2386F26FC10000" // 0.01 ETH in hexadecimal (predefined amount)
        };
        
        // Send the transaction
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [txParams],
        });
        
        console.log("Transaction sent:", txHash);
        alert(`Transaction sent! Hash: ${txHash}`);
        statusMessage.textContent = `Transaction sent! Hash: ${txHash}`;
        statusMessage.className = 'mt-6 text-blue-400';
      } catch (error) {
        console.error('Transaction failed or was rejected.', error);
        alert("Transaction failed or was rejected by the user.");
        statusMessage.textContent = 'Transaction failed or was rejected.';
        statusMessage.className = 'mt-6 text-red-500';
      }
    } else {
      alert("MetaMask is not detected. Please install the MetaMask extension.");
      statusMessage.textContent = 'MetaMask is not detected.';
      statusMessage.className = 'mt-6 text-red-500';
    }
  }
  
  // Attach function to button click
  window.connectAndDonate = connectAndDonate;
});
