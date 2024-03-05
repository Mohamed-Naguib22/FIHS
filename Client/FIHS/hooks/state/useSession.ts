import storage from "@/utils/storage";
import { create } from "zustand";


interface SessionState extends Session {
    isLoading: boolean,
    setLoading: (status: boolean)=>void,
    setSession: (session: Session)=>void,
}

const useSession = create<SessionState>((set)=>(
    {
    isLoading:false,
    firstName:'',
    lastName:'',
    phoneNumber:'',
    token:'',
    email:'',
    emailConfirmed:false,
    expiresOn:'',
    imgUrl:null,
    isAuthenticated:false,
    refreshTokenExpiration:'',
    roles:[],
    setLoading:(status: boolean)=>set((state)=>{
        return {
            isLoading:status
        }
    }),
    setSession:(session: Partial<Session>)=>set((state)=>{
        if(session.token!=''){
            storage.save({
                    key:'session',
                    data:{
                        token:session?.token || state.token,
                        email:session?.email || state.email,
                        firstName:session?.firstName || state.firstName,
                        lastName:session?.lastName || state.lastName,
                        phoneNumber:session?.phoneNumber || state.phoneNumber,
                        emailConfirmed:session?.emailConfirmed || state.emailConfirmed,
                        expiresOn:session?.expiresOn || state.expiresOn,
                        imgUrl:session?.imgUrl || state.imgUrl,
                        isAuthenticated:session?.isAuthenticated || state.isAuthenticated,
                        refreshTokenExpiration:session?.refreshTokenExpiration || state.refreshTokenExpiration,
                        roles:session?.roles || state.roles,
                    }
                })
        }
        return {
            token:session?.token || state.token,
            email:session?.email || state.email,
            firstName:session?.firstName || state.firstName,
            lastName:session?.lastName || state.lastName,
            phoneNumber:session?.phoneNumber || state.phoneNumber,
            emailConfirmed:session?.emailConfirmed || state.emailConfirmed,
            expiresOn:session?.expiresOn || state.expiresOn,
            imgUrl:session?.imgUrl || state.imgUrl,
            isAuthenticated:session?.isAuthenticated || state.isAuthenticated,
            refreshTokenExpiration:session?.refreshTokenExpiration || state.refreshTokenExpiration,
            roles:session?.roles || state.roles,
        }
    }),
}))
export default useSession

//@ts-ignore
export const DEFAULT_SESSION = {
    isLoading:false,
    firstName:undefined,
    lastName:undefined,
    phoneNumber:undefined,
    token:undefined,
    email:undefined,
    emailConfirmed:undefined,
    expiresOn:undefined,
    imgUrl:null,
    isAuthenticated:false,
    refreshTokenExpiration:undefined,
    roles:[],
}
