import * as yup from 'yup'

export const CropRecommendationSchema = yup.object({
    N: yup.number().required('برجاء إدخال نسبة النتيروجين'),
    P: yup.number().required('برجاء إدخال نسبة الفوسفور'),
    K: yup.number().required('برجاء إدخال نسبة البوتاسيوم'),
    month: yup.string().required('برجاء إدخال الشهر'),
    ph: yup.number().required('برجاء إدخال نسبة الحموضة'),
    city: yup.string().required('برجاء إدخال المحافظة'),
})
export type CropRecommendation = yup.InferType<typeof CropRecommendationSchema>