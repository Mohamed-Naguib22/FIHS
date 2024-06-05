import * as yup from 'yup'

export const DiseaseSchema = yup.object({
    species: yup.string().required('برجاء إدخال الفصيلة'),
    name: yup.string().required('برجاء إدخال الاسم'),
    scientificName: yup.string().required('برجاء إدخال الاسم العلمي'),
    causes: yup.string().required('برجاء إدخال الاسباب'),
    image: yup.mixed().required('برجاء إرفاق صورة'),
    description: yup.string().required('برجاء إدخال الوصف'),
    treatments: yup.string().required('برجاء إدخال طرق العلاج'),
    symptoms: yup.string().required('برجاء إدخال الاعراض'),
    preventionMethods: yup.string().required('برجاء إدخال طرق الوقاية')
})
export type Disease = yup.InferType<typeof DiseaseSchema>