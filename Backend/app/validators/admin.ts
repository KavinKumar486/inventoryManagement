import vine from '@vinejs/vine'

export const adminLoginValidator = vine.compile(vine.object({
    username: vine.string(),
    password: vine.string(),
}))