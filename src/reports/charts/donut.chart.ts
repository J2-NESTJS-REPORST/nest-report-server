import * as Utils from '../../helpers/';
interface DonutEntry {
  label: string;
  value: number;
}
interface DonutOptions {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DonutEntry[];
}
export const getDonutChart = async (options: DonutOptions): Promise<string> => {
  const { position = top } = options;
  const data = {
    //labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    labels: options.entries.map((e) => e.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map((e) => e.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      legend: {
        position: position,
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
