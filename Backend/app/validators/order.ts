import vine from '@vinejs/vine'

export const orderAddValidator = vine.compile(vine.object({
    customerId: vine.number(),
    orderDate: vine.string().trim().minLength(10).maxLength(10).regex(/^\d{4}\/\d{2}\/\d{2}$/),
    deliveryDate: vine.string().trim().minLength(10).maxLength(10).regex(/^\d{4}\/\d{2}\/\d{2}$/),
    customerLocation: vine.string().maxLength(255).minLength(3),
}))
export const orderGetValidator = vine.compile(vine.object({
    id: vine.number().optional()
}))
export const orderIdValidator = vine.compile(vine.object({
    id: vine.number()
}))
export const orderPatchValidator = vine.compile(vine.object({
    customerId: vine.number().optional(),
    orderDate: vine.string().trim().minLength(10).maxLength(10).regex(/^\d{4}\/\d{2}\/\d{2}$/).optional(),
    deliveryDate: vine.string().trim().minLength(10).maxLength(10).regex(/^\d{4}\/\d{2}\/\d{2}$/).optional(),
    customerLocation: vine.string().maxLength(255).minLength(3).optional(),
}))