import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers';
interface TopCountry {
  country: string;
  customers: number;
}
interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

const generateTopCountryDonut = async (
  topCountries: TopCountry[],
): Promise<string> => {
  const data = {
    //labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    labels: topCountries.map((country) => country.country),
    datasets: [
      {
        label: 'Dataset 1',
        data: topCountries.map((country) => country.customers),
        //backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      legend: {
        position: 'left',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart',
      },
      plugins: {
        // legend: {
        //   position: 'top',
        // },
        // title: {
        //   display: true,
        //   text: 'Chart.js Doughnut Chart',
        // },
        datalables: {
          color: 'white',
          font: {
            wight: 'bold',
            size: 14,
          },
        },
      },
    },
  };
  return Utils.chartJsToImage(config, {});
};

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const donutChart = await generateTopCountryDonut(options.topCountries);
  const docDefinition: TDocumentDefinitions = {
    content: [{ image: donutChart, width: 500 }],
  };
  return docDefinition;
};
