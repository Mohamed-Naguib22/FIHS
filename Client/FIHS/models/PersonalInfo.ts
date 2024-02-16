import * as yup  from 'yup'

export const PersonalInfoSchema  = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required()
  })
export type PersonalInfo = yup.InferType<typeof PersonalInfoSchema>