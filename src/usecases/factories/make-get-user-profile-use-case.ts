import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeRegisterUseCase() {
  const prismaGetUserProfileUseCaseRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(
    prismaGetUserProfileUseCaseRepository,
  )

  return registerUseCase
}
