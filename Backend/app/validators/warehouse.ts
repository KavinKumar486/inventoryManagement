import vine from '@vinejs/vine'

export const warehouseAddValidator = vine.compile(vine.object({
    location: vine.string().trim().minLength(2).maxLength(100),
    productName: vine.string().trim().minLength(2).maxLength(100),
    productQuantity: vine.number().min(1).max(1000),
    price: vine.number().min(1).max(10000),
    orderQuantity: vine.number().min(1).max(1000)
}))

export const warehouseGetValidator = vine.compile(vine.object({
    id: vine.number().optional()
}))
export const warehouseIdValidator = vine.compile(vine.object({
    id: vine.number()
}))
export const warehousePatchValidator = vine.compile(vine.object({
    location: vine.string().trim().minLength(2).maxLength(100).optional(),
    productName: vine.string().trim().minLength(2).maxLength(100).optional(),
    productQuantity: vine.number().min(1).max(1000).optional(),
    price: vine.number().min(1).max(10000).optional(),
    orderQuantity: vine.number().min(1).max(1000).optional(),
    orderId: vine.number().optional()
}))