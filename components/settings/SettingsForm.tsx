"use client";
import React, { useState,useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary';

import { Input } from '@/components/ui/input'


import Image from 'next/image';
import { useSignMessage } from 'wagmi'
import {useUserStore} from '@/store/userStore'
import { RxAvatar } from "react-icons/rx";
import { useToast } from "@/hooks/use-toast"
import {updateProfile} from "@/lib/action"
// import { useUserStore } from '@/store/userStore';
// impo


const SettingsForm = () => {
    const user = useUserStore((state)=>state.user)
    const updateUser = useUserStore((state)=>state.updateUser)
    const [image,setImage] = useState(user?.profilePhoto)
    const [name,setName] = useState("")
    const { toast } = useToast()
    const { signMessage,data:signedMessageData,isPending} = useSignMessage()
    


    useEffect(()=>{
        console.log("signed_data",signedMessageData)
        if(! signedMessageData){
            return
        }
        let data:{name?:string,profilePhoto?:string ,signedMessageData:`0x${string}`};
        const imageChanged = image !== user?.profilePhoto
        console.log({image})
        console.log({ps:user?.profilePhoto})
        console.log({imageChanged})
        if(name && imageChanged){  
            data = {name,profilePhoto:image || "",signedMessageData:signedMessageData}
        }
        else if(name ){
            data = {name,signedMessageData}
            
        }
        else if(imageChanged){
            data = {profilePhoto:image || "",signedMessageData}
            
            
        }
        const sendRequest = async()=>{
            try{

                const userProfile = await updateProfile(data)
                console.log(userProfile,"upup")
                updateUser(userProfile["data"]);
                toast({
        
        
                    description: `Profile updated`,
                    
                  })
            }catch(err){
                throw err
            }
            
        }
        sendRequest()
        console.log("signed_data",signedMessageData)

    },[signedMessageData])




 
    const handleClick = async() =>{
        // await updateProfile()
        const imageChanged = (image !== user?.profilePhoto) && (image != null)
        
        console.log({image})
        console.log({ps:user?.profilePhoto})
        console.log({imageChanged})
        if(name && imageChanged){  
            signMessage({ message: `update profile  username will change to ${name}`})
        }
        else if(name ){
            signMessage({ message: `update username to ${name}`})
        }
        else if(imageChanged){
            signMessage({ message: `update profile photo`})

        }

       


        
    }
    return (

        <div className="mt-64 bg-gray-900/80 mx-auto container w-auto p-5 md:mt-0 translate-y-[-50%] space-y-4 font-sans rounded-xl">
            <h1 className='text-4xl text-center text-purple-600'>Update Your Profile</h1>

            <div className="flex flex-col gap-5">
                <div className="flex gap-3">
                    {
                        image ? (

                            <Image alt="profile" width={28} height={28} src={image} className="rounded-full" />
                        ):(

                            <RxAvatar  className='w-7 h-7 rounded-full text-white/60'/>

                        )
                    }
                    <CldUploadWidget
                       onSuccess={(result)=>{
                        //   @ts-expect-error: this is a valid code
                          setImage(result.info.secure_url);

                       }}
                        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}>
                        {({ open }) => {
                            return (
                                <button onClick={() => open()}>
                                    Upload an Image
                                </button>
                            );
                        }}

                    </CldUploadWidget>
                </div>

                <Input placeholder='username' value={name} onChange={(e)=>setName(e.target.value)} />

                <button disabled={isPending} className='rounded-xl px-5 py-2  bg-purple-600 disabled:bg-gray-600' onClick={handleClick}>Submit</button>

            </div>

        </div>

    )
}

export default SettingsForm