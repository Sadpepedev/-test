// Get DOM elements
const connectWalletButton = document.getElementById('connectWallet');
const donationSection = document.getElementById('donation');
const donateButton = document.getElementById('donateButton');

// Donation details
const donationAddress = '0x030CdE70309bacB42f72df1E769440b342EF3696';
const donationAmount = '0.1'; // Amount in ETH

/**
 * Check if MetaMask is installed
 * @returns {boolean}
 */
function isMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
}

/**
 * Connect to MetaMask wallet
 */
async function connectWallet() {
    if (!isMetaMaskInstalled()) {
        alert('MetaMask is not installed. Please install it to use this feature.');
        return;
    }

    try {
        // Request account access if needed
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('Connected account:', account);

        // Hide the connect button and show the donation section
        connectWalletButton.style.display = 'none';
        donationSection.classList.remove('hidden');
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
    }
}

/**
 * Initiate the donation transaction
 */
async function donate() {
    if (!isMetaMaskInstalled()) {
        alert('MetaMask is not installed.');
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tx = {
        to: donationAddress,
        value: ethers.utils.parseEther(donationAmount)
    };

    try {
        // Send the transaction
        const transaction = await signer.sendTransaction(tx);
        console.log('Transaction sent:', transaction);

        // Wait for the transaction to be mined
        await transaction.wait();
        alert('Donation successful! Thank you for your support.');
    } catch (error) {
        console.error('Error sending transaction:', error);
        alert('Donation failed. Please try again.');
    }
}

// Event listeners
connectWalletButton.addEventListener('click', connectWallet);
donateButton.addEventListener('click', donate);
