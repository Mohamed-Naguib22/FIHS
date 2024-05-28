import * as yup from 'yup'

export const FertilizerSchema = yup.object({
    name: yup.string().required('برجاء إدخال الاسم'),
    image: yup.mixed().required('برجاء إرفاق صورة'),
    manufactuer: yup.string().required('برجاء إدخال المصنع'),
    usageInstructions: yup.string().required('برجاء إدخال طرق الاستعمال')
})
export type Fertilizer = yup.InferType<typeof FertilizerSchema>