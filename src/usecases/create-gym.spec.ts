import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to authenticate', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: '',
      phone: '',
      latitude: -23.6821601,
      longitude: -46.4757127,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
