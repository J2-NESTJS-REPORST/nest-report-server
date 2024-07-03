import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections';
import { OrderCompleted } from 'src/interfaces/order.interface';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};
const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};
interface ReportValues {
  title?: string;
  subTitle?: string;
  data: OrderCompleted;
}
export const orderByIdReport = ({
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subTitle,
  data,
}: ReportValues): TDocumentDefinitions => {
  //console.log(title, subTitle, data);

  //   {
  //     text: CurrencyFormatter.getCurrencyFormat(100),
  //     alignment: 'right',
  //   },
  const dataDetails = data.order_details.map((detail) => [
    detail.product_id,
    detail.products.product_name,
    detail.quantity,
    CurrencyFormatter.getCurrencyFormat(+detail.products.price),

    // CurrencyFormatter.getCurrencyFormat(
    //   detail.quantity * +detail.products.price,
    // ),
    //!EN este punto como la la ultima columna tiene que esta alineada a la derecha tengo que manejar la columna de manera independiente como objeto {text:'sdfsdf',alignment:'right'}
    {
      text: CurrencyFormatter.getCurrencyFormat(
        detail.quantity * +detail.products.price,
      ),
      alignment: 'right',
    },
  ]);
  //!Version con forEach()
  // let subTotal = 0;
  // data.order_details.forEach(
  //   (detail) =>
  //     (subTotal = subTotal + detail.quantity * +detail.products.price),
  // );
  //!Version con reduce()
  const subTotal = data.order_details.reduce(
    (acc, detail) => (acc = detail.quantity * +detail.products.price),
    0,
  );
  const total = subTotal * 1.15;
  return {
    styles: styles,
    header: logo,

    //!A diferencia del header que ejecutamos la funcion headerSection con sus argumentos. footerSection es un callback internamente manejara los argumentos currentPage, pageCount, pageSize
    footer: (currentPage, pageCount) => footerSection(currentPage, pageCount),
    pageMargins: [40, 60, 40, 60],
    content: [
      //!Primera Linea Header
      {
        //text: 'Tucan Code',
        text: title,
        style: 'header',
      },

      //!Segunda Linea Direccion y recibo
      {
        columns: [
          {
            text: `Urbanizacion Los Olivos, Ave. Primera 123.\nGuayaquil, Ecuador.\nTelefono: 59378878899`,
          },
          {
            text: [
              {
                text: `Recibo No. ${data.order_id}\n`,
                bold: true,
                style: { fontSize: 14 },
              },
              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(data.order_date)}\n Pagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())} `,
            ],
            alignment: 'right',
          },
        ],
      },
      //! Tercera linea Codigo QR, el fit tiene que sun un number
      {
        qr: 'https://devtalles.com',
        fit: 75,
        alignment: 'right',
        margin: [0, 20, 0, 0],
      },
      //!Cuarta linea Cobrar a:
      {
        text: [
          {
            text: `Cobrar a: \n`,
            //bold: true,
            style: 'subHeader',
          },
          `Razón Social: ${data.customers.customer_name}}
           ${data.customers.contact_name}
           ${data.customers.address},  ${data.customers.city}, ${data.customers.country}`,
        ],
      },
      //!Quinta linea tabla de detalle
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            //Primera fila es el header
            ['ID', 'Descripcion', 'Cantidad', 'Precio', 'Total'],
            // [
            //   '1',
            //   'Producto 1',
            //   '1',
            //   '100',
            //   CurrencyFormatter.getCurrencyFormat(100),
            // ],
            // [
            //   '1',
            //   'Producto 1',
            //   '1',
            //   '100',
            //   CurrencyFormatter.getCurrencyFormat(100),
            // ],
            // [
            //   '1',
            //   'Producto 1',
            //   '1',
            //   '100',
            //   CurrencyFormatter.getCurrencyFormat(100),
            // ],
            // [
            //   '1',
            //   'Producto 1',
            //   '1',
            //   '100',
            //   {
            //     text: CurrencyFormatter.getCurrencyFormat(100),
            //     alignment: 'right',
            //   },
            // ],
            ...dataDetails,
          ],
        },
      },

      //Salto de linea
      `\n\n`,
      //!Totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.getCurrencyFormat(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  'TAX (15%)',
                  {
                    text: CurrencyFormatter.getCurrencyFormat(subTotal * 0.15),
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'Total',
                    bold: true,
                  },
                  {
                    text: CurrencyFormatter.getCurrencyFormat(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
