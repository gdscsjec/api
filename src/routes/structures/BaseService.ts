import { PrismaClient } from "@prisma/client";

export class PrismaService<
  K extends Exclude<keyof PrismaClient, symbol | `$${string}`>
> {
  private readonly model: K;
  private readonly prisma: PrismaClient;

  constructor(model: K) {
    this.model = model;
    this.prisma = new PrismaClient();
  }

  aggregate(
    ...args: Parameters<PrismaClient[K]["aggregate"]>
  ): ReturnType<PrismaClient[K]["aggregate"]> {
    return (this.prisma[this.model].aggregate as any)(...args);
  }

  count(
    ...args: Parameters<PrismaClient[K]["count"]>
  ): ReturnType<PrismaClient[K]["count"]> {
    return (this.prisma[this.model].count as any)(...args);
  }

  create(
    ...args: Parameters<PrismaClient[K]["create"]>
  ): ReturnType<PrismaClient[K]["create"]> {
    return (this.prisma[this.model].create as any)(...args);
  }

  createMany(
    ...args: Parameters<PrismaClient[K]["createMany"]>
  ): ReturnType<PrismaClient[K]["createMany"]> {
    return (this.prisma[this.model].createMany as any)(...args);
  }

  delete(
    ...args: Parameters<PrismaClient[K]["delete"]>
  ): ReturnType<PrismaClient[K]["delete"]> {
    return (this.prisma[this.model].delete as any)(...args);
  }

  findFirst(
    ...args: Parameters<PrismaClient[K]["findFirst"]>
  ): ReturnType<PrismaClient[K]["findFirst"]> {
    return (this.prisma[this.model].findFirst as any)(...args);
  }

  findFirstOrThrow(
    ...args: Parameters<PrismaClient[K]["findFirstOrThrow"]>
  ): ReturnType<PrismaClient[K]["findFirstOrThrow"]> {
    return (this.prisma[this.model].findFirstOrThrow as any)(...args);
  }

  findMany(
    ...args: Parameters<PrismaClient[K]["findMany"]>
  ): ReturnType<PrismaClient[K]["findMany"]> {
    return (this.prisma[this.model].findMany as any)(...args);
  }

  findUnique(
    ...args: Parameters<PrismaClient[K]["findUnique"]>
  ): ReturnType<PrismaClient[K]["findUnique"]> {
    return (this.prisma[this.model].findUnique as any)(...args);
  }

  findUniqueOrThrow(
    ...args: Parameters<PrismaClient[K]["findUniqueOrThrow"]>
  ): ReturnType<PrismaClient[K]["findUniqueOrThrow"]> {
    return (this.prisma[this.model].findUniqueOrThrow as any)(...args);
  }

  groupBy(
    ...args: Parameters<PrismaClient[K]["groupBy"]>
  ): ReturnType<PrismaClient[K]["groupBy"]> {
    return (this.prisma[this.model].groupBy as any)(...args);
  }

  update(
    ...args: Parameters<PrismaClient[K]["update"]>
  ): ReturnType<PrismaClient[K]["update"]> {
    return (this.prisma[this.model].update as any)(...args);
  }

  updateMany(
    ...args: Parameters<PrismaClient[K]["updateMany"]>
  ): ReturnType<PrismaClient[K]["updateMany"]> {
    return (this.prisma[this.model].updateMany as any)(...args);
  }

  async upsert(
    ...args: Parameters<PrismaClient[K]["upsert"]>
  ): Promise<ReturnType<PrismaClient[K]["upsert"]>> {
    return await (this.prisma[this.model].upsert as any)(...args);
  }
}

const memberData = new PrismaService("member");

memberData.