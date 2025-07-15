import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // use this if you want PrismaService to be available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

/*

This is a good and widely-used approach, but there are several alternatives depending on your specific needs and preferences.

Current Approach: Global Module
Pros:

Simple and convenient - inject PrismaService anywhere without imports
Reduces boilerplate across modules
Standard pattern in many NestJS applications
Cons:

Makes dependencies less explicit and harder to track
Can make testing more complex (global state)
Goes against some dependency injection best practices
Alternative Approaches:
1. Non-Global Module (Explicit Imports)

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

Then import it in each feature module:

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

Better for: Explicit dependencies, easier testing, clearer module boundaries

2. Repository Pattern

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async create(data: CreateTaskDto) {
    return this.prisma.task.create({ data });
  }
}


Better for: Abstracting database operations, easier to mock, better separation of concerns

ref: https://docs.nestjs.com/recipes/prisma#set-up-prisma
*/
