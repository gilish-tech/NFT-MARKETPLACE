"use client"
import React,{useState,useEffect} from 'react'
import { useConnect,useDisconnect ,useAccountEffect,Connector,useAccount} from 'wagmi'
import { storeUser,logoutUser } from '@/lib/action';

import Image from 'next/image';
import { useToast } from "@/hooks/use-toast"

import { useUserStore } from '@/store/userStore';



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const walletNameToImage = {
  safe: "/images/safe.jpg",
  metamask: "/images/metamask.png"
}





export const DisConnectWalletButton = ()=>{
  const {disconnect} = useDisconnect()
  const deleteUser = useUserStore((state)=>state.deleteUser)
  
  
    
    useAccountEffect({
      onDisconnect:()=>{
         logoutUser();
         deleteUser();
      }

      
    })

    return(
      <button className='bg-gray-700 hover:bg-gray-500/30 text-white px-6 py-2 rounded-full transition-all duration-200'
      onClick={()=>disconnect()}>Disconnect</button>
    )

}

export const ConnectWalletButton = ({small,text,styles}:{small?:boolean,text?:string,styles?:string}) => {
  const { connectors, connectAsync } = useConnect();
  const {disconnect} = useDisconnect()
  const { toast } = useToast()
  const [disabled, setDisabled] = useState(false)
  const updateUser = useUserStore((state)=>state.updateUser)
  const deleteUser = useUserStore((state)=>state.deleteUser)
  const user = useUserStore((state)=>state.user)
  const account = useAccount();

  useEffect(()=>{
    if (account?.address && !user){

      async function loginUser(){
        const data = await storeUser(account.address || "");
        updateUser(data.user)


      }
      loginUser()


    }else{
      deleteUser()
    }
    

  },[])
  





  
  


  const handleConnect = async (connector:Connector) => {
    try{
      setDisabled(true)
      const account = await connectAsync({connector});
      const data = await storeUser(account.accounts[0]);
      console.log(account);
      updateUser(data.user)
      
      toast({
        
        
        description: `${connector.name} Connected`,
        
      })
      setDisabled(false)
    }catch{
      disconnect()
      setDisabled(false)

    }
   

  }
 


  return (
    <Dialog >
      <DialogTrigger className={`${styles ? styles : "bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-all duration-200"}`}>
        {text ? text : small ? "Connect"  : "Connect Wallet"}
      </DialogTrigger>
      <DialogContent className={`${disabled && "hidden cursor-not-allowed"} bg-gray-900 px-6 pb-8 pt-4 rounded-lg shadow-lg max-w-md mx-auto`}>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center text-2xl text-white mb-4">
            <Image height={64} width={64} alt="logo" src="/images/logo.png" className="w-16 h-16 rounded-full object-cover mb-2" />
            <span>Connect to Gilish Market</span>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-3 mt-4">
            {connectors.map((connector) => (
              <span
                key={connector.id}
                onClick={() => handleConnect( connector )}
                className="flex items-center gap-4 p-4 text-lg font-medium text-white bg-gray-800 rounded-lg hover:bg-purple-700/40 transition-colors border-b border-gray-700"
              >
                <Image
                  width={32}
                  height={32}
                
                  src={walletNameToImage[connector.name.toLowerCase() as keyof typeof walletNameToImage]}
                  alt={connector.name}
                  className="rounded-md"
                />
                <span>{connector.name}</span>
              </span>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}


