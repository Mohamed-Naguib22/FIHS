import { useMutation } from '@tanstack/react-query'
import api from '@/utils/api'
import { ImagePickerAsset } from 'expo-image-picker'
import useSession from './state/useSession'
import { AxiosError } from 'axios'

export const useIdentifyPlant = () => useMutation({
    mutationFn: async ({ img }: { img: ImagePickerAsset }) => {
        let fd = new FormData()
        //@ts-ignore
        fd.append('ImgFile', {
            name: img.fileName ?? img.uri,
            uri: img.uri,
            type: "image/jpg"
        })
        return api.post<IdentifyPlant>("/PlantId/identify-plant", fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => res.data).catch((err: AxiosError) => {
            if (err.response?.status === 400) {
                return err.response?.data as string
            }
        })
    }
})

export const useDetectDisease = () => useMutation({
    mutationFn: async ({ img }: { img: ImagePickerAsset }) => {
        let fd = new FormData()
        //@ts-ignore
        fd.append('ImgFile', {
            name: img.fileName ?? img.uri,
            uri: img.uri,
            type: "image/jpg"
        })
        return api.post<DetectDisease>("/PlantId/detect-disease", fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => res.data).catch((err: AxiosError) => {
            if (err.response?.status === 400) {
                return err.response?.data as string
            }
        })
    }
})

