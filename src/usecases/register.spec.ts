import { compare } from 'bcrypt'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'Test',
      email: 'test@test.com',
      password: '12345',
    })

    const isPassword = await compare('12345', user.password_hash)

    expect(isPassword).toBe(true)
  })
})
