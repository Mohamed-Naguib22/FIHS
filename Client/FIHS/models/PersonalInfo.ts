import * as yup  from 'yup'

export const PersonalInfoSchema  = yup.object({
    firstName: yup.string().required('برجاء إدخال الاسم الاول'),
    lastName: yup.string().required('برجاء إدخال الاسم الاخير'),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required('برجاء إدخال رقم الهاتف')
  })
export type PersonalInfo = yup.InferType<typeof PersonalInfoSchema>