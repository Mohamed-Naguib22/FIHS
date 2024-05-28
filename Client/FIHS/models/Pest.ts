import * as yup from 'yup'

export const PestSchema = yup.object({
    species: yup.string().required('برجاء إدخال الفصيلة'),
    name: yup.string().required('برجاء إدخال الاسم'),
    scientificName: yup.string().required('برجاء إدخال الاسم العلمي'),
    image: yup.mixed().required('برجاء إرفاق صورة'),
    description: yup.string().required('برجاء إدخال الوصف'),
    damageSymptoms: yup.string().required('برجاء إدخال الاعراض'),
    controlMethods: yup.string().required('برجاء إدخال طرق الوقاية'),
    lifeCycle: yup.string().required('برجاء إدخال دورة الحياة'),
    geographicDistribution: yup.string().required('برجاء إدخال اماكن الانتشار'),
    reproduction: yup.string().required('برجاء إدخال طرق التكاثر'),
})
export type Pest = yup.InferType<typeof PestSchema>