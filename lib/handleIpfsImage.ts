import {NFTAttributes} from "@/types/nft";


import {contractABI} from "./abi"
import {ethers} from "ethers"





const getNftPrice = async(tokenId: string)=>{

    const {abi} = contractABI
    const providers = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const contractAddress = process.env.NFT_CONTRACT_ADDRESS as `0x${string}`;
    const contract = new ethers.Contract(contractAddress, abi, providers);
    const price = await contract.getPriceOfNft(tokenId)
    const formatted_price = ethers.formatUnits(price.toString(),18)
    return formatted_price
    


}



export const ipfsGateway = (ipfsUri: string) => ipfsUri.replace(/ipfs:\/\//, 'https://ipfs.io/ipfs/');


export const convertTokenUriJson = async(tokenUri: string) => {
    const httpIpfs = ipfsGateway(tokenUri);
    const nftId = tokenUri.split("/").at(-1);
    const price = await getNftPrice(nftId!)
    try{
            const response = await fetch(httpIpfs);
            const json:NFTAttributes = await response.json();
            // console.log("json",json)
            console.log({"data":json,id:nftId,price});
            return {"data":json,id:nftId,price};

    }catch(err){
        
        console.log(err,tokenUri)
        throw(err)
    }
}


