import { ImagePickerAsset } from "expo-image-picker";

export default function ConvertImg(img: ImagePickerAsset) {
    return {
        name: img.fileName ?? img.uri,
        uri: img.uri,
        type: img.mimeType ?? "image/jpg"
    }
}