import {create} from "zustand"
import {User} from "@prisma/client"




interface UserStore{
    user:User | null,
    updateUser:(user:User) => void,
    deleteUser:() => void
}


export const useUserStore = create<UserStore>((set)=>({
    user:null,
    updateUser:(user:User) =>set({user:user}),
    deleteUser:() =>set({user:null})
    

}))
