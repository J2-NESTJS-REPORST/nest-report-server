import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('DB Services');
  async onModuleInit() {
    await this.$connect();
    this.logger.log(`database conected`);
  }
  constructor(private readonly printerService: PrinterService) {
    //Fue necesario este super() porque la clace esta haciendo una extension de Prisma Cliente
    super();
  }
  async getOrderById(orderId: number) {
    //! Este query de p[risma equivale al siguiente query de SQL:
    /**
    SELECT * FROM ORDERS
    INNER JOIN ORDER_DETAILS ON ORDERS.ORDER_ID = ORDER_DETAILS.ORDER_ID
    INNER JOIN PRODUCTS ON ORDER_DETAILS.PRODUCT_ID = PRODUCTS.PRODUCT_ID
    INNER JOIN CUSTOMERS ON ORDERS.CUSTOMER_ID = CUSTOMERS.CUSTOMER_ID
    WHERE
	  ORDERS.ORDER_ID = 10250 
    **/

    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      //!Vamos anidando los include segun las relaciones
      include: {
        customers: true,
        order_details: {
          include: { products: true },
        },
      },
    });
    console.log(JSON.stringify(order, null, 2));
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} does not exist`);
    }
    const docDefinition = orderByIdReport({ data: order as any });
    return await this.printerService.createPdf(docDefinition);
  }
}
