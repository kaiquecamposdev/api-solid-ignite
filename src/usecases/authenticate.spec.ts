import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcrypt'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate use case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it("shouldn't be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password_hash: await hash('12345', 6),
    })

    expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
