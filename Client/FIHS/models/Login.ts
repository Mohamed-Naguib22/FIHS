import * as yup  from 'yup'

export const Login  = yup.object({
    email: yup.string().email('برجاء إدخال بريد إلكتروني صالح').required("البريد الإلكتروني مطلوب لتسجيل الدخول"),
    password: yup.string().required("كلمة المرور مطلوبة لتسجيل الدخول").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/, {
        message:"الرجاء إدخال كلمة مرور صالحة. يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم وحرف خاص، وأن تزيد طولها عن ٨ أحرف."
    })
  })
export type LoginSchema = yup.InferType<typeof Login>