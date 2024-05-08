import * as yup from 'yup'

export const CommentFormSchema = yup.object({
    commentBody: yup.string().required('برجاء إدخال محتوي التعليق'),
    entityId: yup.number().required('خطأ في معرف نوع التعليق'),
    entityType: yup.string().required('خطأ في نوع التعليق')
})
export type ICommentForm = yup.InferType<typeof CommentFormSchema>