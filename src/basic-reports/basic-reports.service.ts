import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient, continents } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountriesReport,
  getEmploymentLetterReport,
  getEmploymentLetterReportById,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  //[x: string]: any;
  private readonly logger = new Logger('DB Services');
  async onModuleInit() {
    await this.$connect();
    this.logger.log(`database conected`);
  }
  constructor(private readonly printerService: PrinterService) {
    //Fue necesario este super() porque la clace esta haciendo una extension de Prisma Cliente
    super();
  }
  async hello() {
    const docDefinition = getHelloWorldReport({ name: 'Juan Jose' });
    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
    //return this.employees.findFirst();
    //return this.employees.findMany();
  }

  async employmentLetter() {
    const docDefinition = getEmploymentLetterReport();
    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
    //return this.employees.findFirst();
    //return this.employees.findMany();
  }

  async employmentLetterById(id: number) {
    const employee = await this.employees.findFirst({
      where: {
        id,
      },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ${id} not found`);
    }
    //console.log(employee);
    const docDefinition = getEmploymentLetterReportById({
      employerName: 'Juan Jose Collantes',
      employerPosition: 'Gerente de RRHH',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp.',
    });
    const doc = await this.printerService.createPdf(docDefinition);
    return doc;
    //return this.employees.findFirst();
    //return this.employees.findMany();
  }

  async getCountryReport() {
    const countries = await this.countries.findMany({
      where: {
        local_name: { not: null },
      },
    });
    const docDefinition = getCountriesReport({ data: countries });
    return await this.printerService.createPdf(docDefinition);
    //return this.employees.findFirst();
    //return this.employees.findMany();
  }

  async getCountryReportByContinent(continent: string) {
    try {
      const countries = await this.countries.findMany({
        where: {
          local_name: { not: null },
          //De ambas manera se puede hacer busqueda en el campo continent
          continent: {
            equals: continent as continents,
          },
          //continent: continent as continents,
        },
      });
      const docDefinition = getCountriesReport({ data: countries });
      return await this.printerService.createPdf(docDefinition);
      //return this.employees.findFirst();
      //return this.employees.findMany();
    } catch (error) {
      throw new NotFoundException(`Continent ${continent} does not exist`);
    }
  }
}
