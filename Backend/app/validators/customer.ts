import vine from '@vinejs/vine'
export const customerAddValidator= vine.compile(vine.object({
    name: vine.string().trim().minLength(3).maxLength(50),
    email:vine.string().trim().email(),
    password:vine.string().trim().minLength(8).maxLength(32)
    }))
export const customerGetValidator = vine.compile(vine.object({
    id:vine.number().optional()
}))
export const customerIdValidator=  vine.compile(vine.object({
    id:vine.number()
}))