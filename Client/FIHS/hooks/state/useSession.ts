import storage from "@/utils/storage";
import { IMessage } from "react-native-gifted-chat";
import { create } from "zustand";


interface SessionState extends Session {
    isLoading: boolean,
    chatMessages: IMessage[],
    setEmail: (email: string | undefined) => void,
    setLoading: (status: boolean) => void,
    setChatMessages: (chatMessages: IMessage[]) => void,
    setSession: (session: Session) => void,
}

const useSession = create<SessionState>((set) => (
    {
        isLoading: false,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        token: '',
        email: '',
        emailConfirmed: false,
        expiresOn: '',
        chatMessages: [],
        imgUrl: null,
        isAuthenticated: false,
        refreshTokenExpiration: '',
        roles: [],
        setLoading: (status: boolean) => set((state) => {
            return {
                isLoading: status
            }
        }),
        setEmail: (email: string | undefined) => set((state) => {
            if (email) {
                storage.save({ key: 'email', data: email })
                return {
                    email: email
                }
            }
            else {
                storage.remove({ key: 'email' })
                return {
                    email: undefined
                }
            }
        }),
        setChatMessages: (chatMessages: IMessage[]) => set((state) => {
            if (chatMessages.length) {
                storage.save({
                    key: 'chat',
                    data: chatMessages
                })
            } else {
                storage.remove({
                    key: 'chat'
                })
            }
            return {
                chatMessages: chatMessages
            }
        }

        ),
        setSession: (session: Partial<Session>) => set((state) => {
            if (session.token) {
                storage.save({
                    key: 'session',
                    data: {
                        token: session?.token || state.token,
                        email: session?.email || state.email,
                        firstName: session?.firstName || state.firstName,
                        lastName: session?.lastName || state.lastName,
                        phoneNumber: session?.phoneNumber || state.phoneNumber,
                        emailConfirmed: session?.emailConfirmed || state.emailConfirmed,
                        expiresOn: session?.expiresOn || state.expiresOn,
                        imgUrl: session?.imgUrl || state.imgUrl,
                        isAuthenticated: session?.isAuthenticated || state.isAuthenticated,
                        refreshTokenExpiration: session?.refreshTokenExpiration || state.refreshTokenExpiration,
                        roles: session?.roles || state.roles,
                    }
                })
            } else {
                storage.remove({ key: 'session' })
            }
            return {
                token: session?.token || state.token,
                email: session?.email || state.email,
                firstName: session?.firstName || state.firstName,
                lastName: session?.lastName || state.lastName,
                phoneNumber: session?.phoneNumber || state.phoneNumber,
                emailConfirmed: session?.emailConfirmed || state.emailConfirmed,
                expiresOn: session?.expiresOn || state.expiresOn,
                imgUrl: session?.imgUrl || state.imgUrl,
                isAuthenticated: session?.isAuthenticated || state.isAuthenticated,
                refreshTokenExpiration: session?.refreshTokenExpiration || state.refreshTokenExpiration,
                roles: session?.roles || state.roles,
            }
        }),
    }))
export default useSession

//@ts-ignore
export const DEFAULT_SESSION = {
    isLoading: false,
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    token: undefined,
    email: undefined,
    emailConfirmed: undefined,
    expiresOn: undefined,
    imgUrl: null,
    isAuthenticated: false,
    refreshTokenExpiration: undefined,
    roles: [],
}
