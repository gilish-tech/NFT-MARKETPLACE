import {NFTAttributes} from "@/types/nft";





export const ipfsGateway = (ipfsUri: string) => ipfsUri.replace(/ipfs:\/\//, 'https://ipfs.io/ipfs/');


export const convertTokenUriJson = async(tokenUri: string) => {
    const httpIpfs = ipfsGateway(tokenUri);
    const nftId = tokenUri.split("/").at(-1);
    try{
            const response = await fetch(httpIpfs);
            const json:NFTAttributes = await response.json();
            // console.log("json",json)
            console.log({"data":json,id:nftId});
            return {"data":json,id:nftId};

    }catch(err){
        
        console.log(err,tokenUri)
        throw(err)
    }
}


