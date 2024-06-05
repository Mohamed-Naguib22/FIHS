import * as yup from 'yup'

export const PesticideSchema = yup.object({
    name: yup.string().required('برجاء إدخال الاسم'),
    image: yup.mixed().required('برجاء إرفاق صورة'),
    description: yup.string().required('برجاء إدخال الوصف'),
    manufactuer: yup.string().required('برجاء إدخال المصنع'),
    toxicity: yup.string().required('برجاء إدخال درجة السمية'),
    type: yup.string().required('برجاء إدخال النوع'),
    usageInstructions: yup.string().required('برجاء إدخال طرق الاستعمال')
})
export type Pesticide = yup.InferType<typeof PesticideSchema>