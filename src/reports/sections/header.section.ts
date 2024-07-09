import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 0],
};

const currentDay: Content = {
  text: `${DateFormatter.getDDMMMMYYYY(new Date())}`,
  alignment: 'right',
  //margin: [20, 20, 20, 20],
  margin: [20, 30],
  width: 150,
};
interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}
export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showDate = true, showLogo = true } = options;

  const showLogoContent: Content = showLogo ? logo : null;
  const showDateContent: Content = showDate ? currentDay : null;
  //!Creamos el content headerTitle para el stack
  const headerTitle: Content = title
    ? {
        text: title,
        alignment: 'center',
        margin: [0, 15, 0, 0],
        style: {
          bold: true,
          fontSize: 22,
        },
      }
    : null;
  //!Creamos el content headerSubTitle para el stack
  const headerSubTitle: Content = subTitle
    ? {
        text: subTitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          //bold: true,
          fontSize: 16,
        },
      }
    : null;

  const headerStack: Content = {
    stack: [
      // second column consists of paragraphs
      headerTitle,
      headerSubTitle,
    ],
  };
  return {
    //La primera columna sera el logo
    //La segunda columa es el stack que incluye en una sola columna el parrafo del titulo y el parrafo del Subtitle
    //La 3ra es la fecha
    columns: [showLogoContent, headerStack, showDateContent],
  };
};
