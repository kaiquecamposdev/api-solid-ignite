import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password_hash: await hash('12345', 6),
    })

    const { user } = await sut.execute({
      email: 'test@test.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it("shouldn't be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it("shouldn't be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password_hash: await hash('12345', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
