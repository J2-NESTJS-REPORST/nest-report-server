import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut.chart';
import { footerSection, headerSection } from './sections';
import { getLineChart } from './charts/line.chart';
import { getBarsChart } from './charts/bars.chart';
import { getSteppedLineChart } from './charts/steppedlinechart';
interface TopCountry {
  country: string;
  customers: number;
}
interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const listaTopCountries = options.topCountries.map((countries) => [
    countries.country,
    countries.customers,
  ]);
  console.log(listaTopCountries);
  //!getDonutChart es la funcion que se utilizo para la refactorizacion del codigo que genera el donut. Se tuvo que generar otro array de countries para que cumpla con la interfaz de getDonutChart.
  // const donutChart = await getDonutChart({
  //   entries: options.topCountries.map((c) => ({
  //     label: c.country,
  //     value: c.customers,
  //   })),
  //   position: 'left',
  // });

  //const lineChart = await getLineChart();

  const [donutChart, lineChart, barsChart, steppedLineChart] =
    await Promise.all([
      getDonutChart({
        entries: options.topCountries.map((c) => ({
          label: c.country,
          value: c.customers,
        })),
        position: 'left',
      }),
      getLineChart(),
      getBarsChart(),
      getSteppedLineChart(),
    ]);
  const docDefinition: TDocumentDefinitions = {
    //izquierda,arriba,derecha,abajo
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadisticas de Clientes',
      subTitle: options.subTitle ?? 'Top 10 Paises con mas clientes.',
    }),
    footer: footerSection,
    content: [
      // {
      //   image: donutChart,
      //   width: 500,
      // },
      {
        columns: [
          //!Primera Columna
          {
            stack: [
              {
                text: '10 Paises con mas clientes',
                alignment: 'center',
                //izquierda,arriba,derecha,abajo
                margin: [0, 0, 0, 10],
              },

              {
                image: donutChart,
                width: 320,
              },
            ],
          },

          //!Segunda Columna
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Pais', 'Clientes'],
                //dibujamos las otras filas haciendo el spread
                ...listaTopCountries,
              ],
            },
          },
        ],
      },
      {
        //Otra linea
        image: lineChart,
        width: 400,
        margin: [0, 20],
      },
      {
        //Otra linea
        columnGap: 10,
        columns: [
          { image: barsChart, width: 250, margin: [0, 20] },
          { image: steppedLineChart, width: 250, margin: [0, 20] },
        ],
      },
    ],
  };
  return docDefinition;
};
