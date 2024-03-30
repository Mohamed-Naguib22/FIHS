import * as yup from 'yup'

export const ForgetPassword = yup.object({
    email: yup.string().email('برجاء إدخال بريد إلكتروني صالح').required("البريد الإلكتروني مطلوب لإعادة تعيين كلمة المرور")
})
export type ForgetPasswordSchema = yup.InferType<typeof ForgetPassword>