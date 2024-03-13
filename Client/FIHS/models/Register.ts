import * as yup  from 'yup'

export const RegisterForm  = yup.object({
    firstName:yup.string().required("الاسم الاول مطلوب للتسجيل"),
    lastName:yup.string().required("الاسم الاخير مطلوب للتسجيل"),
    email: yup.string().email('برجاء إدخال بريد إلكتروني صالح').required("البريد الإلكتروني مطلوب للتسجيل"),
    password: yup.string().required("كلمة المرور مطلوبة للتسجيل").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/, {
        message:"الرجاء إدخال كلمة مرور صالحة. يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم وحرف خاص، وأن تزيد طولها عن ٨ أحرف."
    }),
    phoneNumber: yup.string().required("رقم الهاتف مطلوب للتسجيل")
  })
export type RegisterSchema = yup.InferType<typeof RegisterForm>