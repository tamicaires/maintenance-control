import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaJobMapper } from '../mappers/PrismaJobMapper';
import { JobRepository } from 'src/core/domain/repositories/job-repository';
import { Job } from 'src/core/domain/entities/job';

@Injectable()
export class PrismaJobRepository implements JobRepository {
  constructor(private prisma: PrismaService) {}

  async create(job: Job): Promise<void> {
    const jobRaw = PrismaJobMapper.toPrisma(job);

    await this.prisma.job.create({
      data: jobRaw,
    });
  }

  async findById(id: string): Promise<Job | null> {
    const jobRaw = await this.prisma.job.findUnique({ where: { id: id } });

    if (!jobRaw) return null;

    return PrismaJobMapper.toDomain(jobRaw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.job.delete({
      where: { id },
    });
  }

  async findMany(page: number, perPage: number): Promise<Job[]> {
    const jobs = await this.prisma.job.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return jobs?.map(PrismaJobMapper.toDomain);
  }

  async findOne(jobTitle: string): Promise<Job | null> {
    const job = await this.prisma.job.findUnique({
      where: { jobTitle },
    });

    if (!job) return null;

    return PrismaJobMapper.toDomain(job);
  }
}
