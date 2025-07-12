import Web3 from 'web3';
import CropContract from '../CropLIstingABI.json'; // Smart contract ABI

const CONTRACT_ADDRESS = '0xF77F8ee90eef6DF2E44278De8F754C8F4bF7f121'; // Contract address

let web3;
let contract;

const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    contract = new web3.eth.Contract(CropContract.abi, CONTRACT_ADDRESS);
    return { web3, contract };
  } else {
    alert('Please install MetaMask to interact with the blockchain.');
    throw new Error('MetaMask not found');
  }
};

export const handleBlockchainSave = async (formData) => {
  const { web3, contract } = await initWeb3();
  const accounts = await web3.eth.getAccounts();

  // Add your actual contract method here
  await contract.methods
    .addCrop(
      formData.listingTitle || '',    // update keys based on formData structure
      formData.originalPrice || '',
      formData.category || '',
      formData.listingDescription || ''
    )
    .send({ from: accounts[0] });

  console.log('Saved to blockchain successfully!');
};


export default initWeb3;
