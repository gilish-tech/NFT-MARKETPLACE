# Gilish Market

![Gilish Market](./screenshots/web-image.PNG)

**Gilish Market** is a blockchain-based website designed to simplify interaction with an on-chain marketplace deployed on the Sepolia testnet. It aims to provide an intuitive experience for non-Web3 and non-technical users.  

[Live Demo](https://gilish-market.vercel.app/)

---

## Features

- **Simplified Interaction:** Makes interacting with blockchain marketplaces accessible for everyone.
- **User-Friendly Interface:** Optimized for users unfamiliar with blockchain technology.
- **Powered by Sepolia Testnet:** Leveraging Ethereum's Sepolia network for seamless integration.

---

## Installation and Setup

### Prerequisites
- Node.js installed on your machine.
- A Sepolia-compatible wallet for testing (e.g., MetaMask).

### Environment Variables
Create a `.env` file in the root directory and populate it with the following keys:

```bash
NFT_META_DATA_URL=""
DATABASE_URL=""
NFT_CONTRACT_ADDRESS="0x"
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_UPLOAD_PRESET=""

```


RUN `npm install --force` beause of the legacy dependency

development run `npm run dev`


production run `npm start`

