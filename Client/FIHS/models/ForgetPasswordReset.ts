import * as yup from 'yup'

export const ForgetPasswordReset = yup.object({
    email: yup.string().email().required(),
    verificationCode: yup.string().required("برجاء إدخال كود التأكيد").length(6, "كود التأكيد يجب ان يتكون من 6 ارقام"),
    token: yup.string().required(),
    newPassword: yup.string().required("برجاء إدخال كلمة المرور الجديدة").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/, {
        message: "الرجاء إدخال كلمة مرور صالحة. يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم وحرف خاص، وأن تزيد طولها عن ٨ أحرف."
    }),
    newPasswordVerify: yup.string().required("برجاء إعادة إدخال كلمة المرور الجديدة").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/, {
        message: "الرجاء إدخال كلمة مرور صالحة. يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم وحرف خاص، وأن تزيد طولها عن ٨ أحرف."
    }),
})
export type ForgetPasswordResetSchema = yup.InferType<typeof ForgetPasswordReset>