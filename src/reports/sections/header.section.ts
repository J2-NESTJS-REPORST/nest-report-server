import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 0],
};
interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}
export const headerSection = (options: HeaderOptions): Content => {
  const {
    title = '',
    subtitle = '',
    showDate = true,
    showLogo = true,
  } = options;

  const showLogoContent: Content = showLogo ? logo : null;
  const showDateContent: Content = showDate
    ? {
        text: `${DateFormatter.getDDMMMMYYYY(new Date())}`,
        alignment: 'right',
        margin: [20, 20, 20, 20],
      }
    : null;
  const titleContent: Content = {
    text: title,
    style: {
      bold: true,
      alignment: 'center',
    },
  };
  return {
    //La primera columna sera el logo
    columns: [showLogoContent, titleContent, showDateContent],
  };
};
