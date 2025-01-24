# E-Commerce Frontend

This project contains the frontend code for an e-commerce platform. The frontend interacts with the smart contract and provides a user interface for product listings, transactions, and user accounts.

## Features

- **Product Listings**: View, add, update, and remove product listings.
- **Transactions**: Securely handle transactions between buyers and sellers.
- **User Accounts**: Manage user accounts and authentication.

account - which stores the address of the wallet connected to the dApp and if the wallet is connected or notnetwork - this field will store the network informationswitchNetwork - this is responsible for switching the network to a certain chainIdconnect() - this function will be used to initiate the wallet connection and update the component state accordinglydisconnect() - this function will be used to disconnect the user wallet which basically means resetting the states of the component to its initial stategetProvider() - this function will return the provider objectgetSigner() - this function will return the signer object

IPFS is a p2p storage solution used in web3 development to store files in a decentralized manner making it secure and tamper proof like blockchain.In our dApp we have introduced a component called uploadIPFS.tsx which again exports 3 functions,uploadToIPFS: This function enables other components to pass a file and upload it to IPFS using API call(we are using Pinata here which is one of the providers of IPFS)isUploading: This is a boolean which returns the loading state of the component, that is, if the uploadIPFS component is pending or completederror: This returns any error that arise during the uploading process of the component, that we can use as a log to debug the code if any problem arisesNow the working of this component is pretty simple as this leverages the Pinata API to upload the files to IPFS and return its CID which is basically a hash used for unique identification of each files on IPFS.