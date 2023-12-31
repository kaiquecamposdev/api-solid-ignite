import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Test',
      email: 'test@test.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Test',
      email: 'test@test.com',
      password: '12345',
    })

    const isPassword = await compare('12345', user.password_hash)

    expect(isPassword).toBe(true)
  })
  it('should not be able to register with same email twice', async () => {
    const email = 'test@test.com'

    await sut.execute({
      name: 'Test',
      email,
      password: '12345',
    })

    await expect(() =>
      sut.execute({
        name: 'Test',
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
