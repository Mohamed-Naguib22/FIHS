import * as yup  from 'yup'

export const ResetPasswordSchema  = yup.object({
    currentPassword: yup.string().required("برجاء إدخال كلمة المرور القديمة").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/, {
      message:"الرجاء إدخال كلمة مرور صالحة. يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم وحرف خاص، وأن تزيد طولها عن ٨ أحرف."
  }),
    newPassword: yup.string().required("برجاء إدخال كلمة المرور الجديدة").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/, {
        message:"الرجاء إدخال كلمة مرور صالحة. يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم وحرف خاص، وأن تزيد طولها عن ٨ أحرف."
    }),
  })
export type ResetPassword = yup.InferType<typeof ResetPasswordSchema>