import * as yup  from 'yup'

export const ResetPasswordSchema  = yup.object({
    oldPassword: yup.string().required().min(8),
    newPassword: yup.string().required().min(8),
  })
export type ResetPassword = yup.InferType<typeof ResetPasswordSchema>