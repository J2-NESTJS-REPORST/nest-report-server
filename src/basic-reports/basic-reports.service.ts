import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('DB Services');
  async onModuleInit() {
    await this.$connect();
    this.logger.log(`database conected`);
  }

  async hello() {
    //return this.employees.findFirst();
    return this.employees.findMany();
  }
}
