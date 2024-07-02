import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, headerSection } from './sections';
import { countries as Country } from '@prisma/client';

interface ReportOptions {
  title?: string;
  subTitle?: string;
  data: Country[];
}
export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, data } = options;
  //console.log(data);

  //!Creamos un array de las filas que tambien es otro array de strings.
  const dataRows = data.map((country) => {
    return [
      country.id.toString(),
      country.iso2,
      country.iso3,
      { text: country.name, bold: true },
      country.continent,
      country.local_name,
    ];
  });
  return {
    header: headerSection({
      title: title ?? 'Countries Report',
      subTitle: subTitle ?? 'List of countries',
      showLogo: true,
    }),
    //console.log(pageSize);
    // { width: 595.28, height: 841.89, orientation: 'portrait' }
    // { orientation: 'portrait', width: 595.28, height: 841.89 }

    // footer: (currentPage, pageCount, pageSize) => {
    //   return currentPage.toString() + ' of ' + pageCount;
    // },

    //!A diferencia del header que ejecutamos la funcion headerSection con sus argumentos, en el footer enviamos solo la referencia. footerSection internamente manejara los argumentos currentPage, pageCount, pageSize
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        //layout: 'lightHorizontalLines', // headerLineOnly
        layout: 'customLayout01',
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            // ['First', 'Second', 'Third', 'The last one'],
            // ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
            // [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
            //!Campos Header
            [
              { text: 'ID', bold: true },
              { text: 'ISO2', bold: true },
              { text: 'ISO3', bold: true },
              { text: 'Name', bold: true },
              { text: 'Continent', bold: true },
              { text: 'Local Name', bold: true },
            ],
            ...dataRows,
          ],
        },
      },

      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          //izquierda,arriba,derecha,abajo
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          //Hay que definir el mismo numero de columnas.
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            //La columnas vacias las configuramos con objetos vacios
            [
              {
                text: 'Total de países',
                colSpan: 2,
                bold: true,
              },
              {},
              {
                text: `${data.length} países`,
                bold: true,
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
