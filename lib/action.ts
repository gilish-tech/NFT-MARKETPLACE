
"use server"
import prisma from "./prisma"
import { cookies } from "next/headers"
import { convertTokenUriJson } from "./handleIpfsImage"
import { ethers } from "ethers";

//signin and authenthicate user
export const storeUser = async (walletAddress: string) => {


    let user;
    const cookieStore = await cookies()

    try {
        user = await prisma.user.findFirst({
            where: {
                walletAddress

            }
        })
        if (!user) {
            user = await prisma.user.create({
                data: {
                    walletAddress
                }

            })
        }
    }
    catch (err) {
        throw (err)
    }

    cookieStore.set("userId", user.id, { secure: true });
    cookieStore.set("walletAddress", user.walletAddress, { secure: true });

    return { message: "value stored", status: 200, user: user }

}

export const logoutUser = async () => {
    try {
        (await cookies()).delete("userId");
        (await cookies()).delete("walletAddress");

    } catch (err) {
        throw err;
    }

}


export const addToFavorite = async (nftId: string) => {
    const cookieStore = await cookies()
    const id = cookieStore.get("userId")?.value
    if (!id) {
        throw ("problem adding data to favorite")
    }
    await prisma.favorite.create({
        data: {
            nftId,
            userId: id

        }
    })

    return { "message": "favorite added" }

}

export const getFavorite = async () => {
    const userId = (await cookies()).get("userId")?.value
    if (!userId) {
        return []
    }

    try {
        const favorite = await prisma.favorite.findMany({
            where: {
                userId
            }

        })

        return favorite
    } catch{
        return []
    }

}

export const deleteFavorite = async (nftId: string) => {
    const cookieStore = await cookies()
    const id = cookieStore.get("userId")?.value
    if (!id) {
        return null
    }
    const favorite = await prisma.favorite.findFirst({
        where: {
            userId: id,
            nftId
        }
    })

    if (!favorite) {
        return null
    }

    try {
        await prisma.favorite.delete({
            where: {
                id: favorite.id
            }

        })

        return favorite
    } catch{
        return null
    }

}

export const getFavoriteData = async () => {
    const favorites = await getFavorite();
    // ${process.env.NFT_META_DATA_URL}/${start + i}
    if (favorites.length) {

        const data = await Promise.all(favorites.map((favorite) => convertTokenUriJson(`${process.env.NFT_META_DATA_URL}/${favorite.nftId}`)));
        return data
    }




    return []

}


export const updateProfile = async (data: { name?: string, profilePhoto?: string, signedMessageData: `0x${string}` }) => {
    let message;
    console.log(data)
    let filteredData;

    if (data["name"] && data["profilePhoto"]) {
        message = `update profile  username will change to ${data["name"]}`
        filteredData = { name: data["name"], profilePhoto: data["profilePhoto"] }
    }
    else if (data["name"]) {
        message = `update username to ${data["name"]}`
        filteredData = { name: data["name"] }
    }
    else if (data["profilePhoto"]) {
        message = `update profile photo`
        filteredData = { profilePhoto: data["profilePhoto"] }


    }

    // verfify the message first
    const walletAddress = (await cookies()).get("walletAddress")?.value
    if (!message) {
        throw ("no message")
    }
    const key = await ethers.verifyMessage(message, data["signedMessageData"]);
    if (walletAddress !== key) {
        throw ("unauthorize user")
    }
    console.log(message)
    const userId = (await cookies()).get("userId")?.value
    // console.log("key",key)
    console.log(filteredData, "fd")
    if (filteredData) {
        const userProfile = await prisma.user.update({
            where: {
                id: userId
            },
            data: filteredData
        })

        console.log(userProfile, "up")

        return { data: userProfile }

    }
    else {
        throw ("err")
    }


    
    
    
}

export const saveMintedNfts = async(hash:string,nftId:string)=>{
    console.log("server stuff")
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    if(!userId){
        throw Error("error")
    }

    try{
        await prisma.mintedNft.create({
            data:{
                hash:hash,
                userId,
                nftId
    
            }
        })

        return {status:201,messsage:"purchase succesful"}
        
    }catch(err){
        throw err

    }


    

} 


export const getMintedNfts = async()=>{
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    if(!userId){
        return []
    }

    try{
        const nfts = await prisma.mintedNft.findMany({
            where:{
                userId,
                
    
            }
        })

        return nfts
        
    }catch(err){
        throw err

    }


    

} 

export const getMintedNftsData = async () => {
    const nfts = await getMintedNfts();
    // ${process.env.NFT_META_DATA_URL}/${start + i}
    if (nfts.length) {

        const data = await Promise.all(nfts.map((nft) => convertTokenUriJson(`${process.env.NFT_META_DATA_URL}/${nft.nftId}`)));
        return data
    }




    return []

}
