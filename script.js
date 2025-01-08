// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const connectWalletButton = document.getElementById('connectWallet');
  const supportSiteButton = document.getElementById('supportSite');
  const statusMessage = document.getElementById('statusMessage');
  
  /**
   * Connect to MetaMask wallet
   */
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('Connected account:', account);
        statusMessage.textContent = `Connected account: ${account}`;
        statusMessage.className = 'mt-6 text-green-400';
      } catch (error) {
        console.error('User rejected the request.');
        statusMessage.textContent = 'Connection rejected by user.';
        statusMessage.className = 'mt-6 text-red-500';
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
      statusMessage.textContent = 'MetaMask is not installed.';
      statusMessage.className = 'mt-6 text-red-500';
    }
  }
  
  /**
   * Support the Site by sending a transaction
   */
  async function supportSite() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const fromAccount = accounts[0];
        
        // Define the transaction parameters
        const txParams = {
          from: fromAccount,
          to: "0x62f1F6bFE3A798d5023608ac0a9c8a9538276283", // Replace with your desired address
          value: "0x0" // 0 ETH by default; users can change this in MetaMask
          // To set a predefined amount (e.g., 0.01 ETH), use the following line instead:
          // value: "0x2386F26FC10000" // 0.01 ETH in hexadecimal
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
  
  // Attach functions to button clicks
  connectWalletButton.onclick = connectWallet;
  supportSiteButton.onclick = supportSite;
});
