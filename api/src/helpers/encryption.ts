import { hash, compare } from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config({ path: '.env' })

export function generateJwtToken(params = {}): string {
    return jwt.sign(
        params,
        process.env.JWT_SECRET,
        {
            expiresIn: 86400 * 1
        }
    )
}
/**
 * Encrypt password
 * @param password
 * @returns
 */
export async function encryptPassword(password: string) {
    const hashed = await hash(password, 10)
    return hashed
}

/**
 * Validate if password matches
 * @param plainPassword
 * @param hashedPassword
 * @returns
 */
export async function validatePassword(plainPassword: string, hashedPassword: string) {
    const match = await compare(plainPassword, hashedPassword)
    return match
}
