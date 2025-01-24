// src/contract.js
import web3 from './web3.js';
import ECommerce from './ECommerce.json'; // Import your contract's ABI

const contractAddress = '0x356edA5558641C70E39fA4920B63d88Bcc12b1C2'; // Replace with your contract address
const contract = new web3.eth.Contract(ECommerce.abi, contractAddress);

export default contract;