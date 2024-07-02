import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

import { headerSection } from './sections';
import { DateFormatter } from 'src/helpers';
// interface ReportOptions {
//   name: string;
// }

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    //izquierda, arriba derecha, abajo
    margin: [0, 50, 0, 50],
  },
  body: {
    //izquierda, arriba derecha, abajo
    margin: [0, 0, 0, 70],
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  },
  footer: {
    fontSize: 10,
    italics: true,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};
// const logo: Content = {
//   image: 'src/assets/tucan-code-logo.png',
//   width: 100,
//   height: 100,
//   alignment: 'center',
//   margin: [0, 0, 0, 0],
// };

//!No use la interfaz de prisma porque desde el servicio vienen mas datos adicionales al empleado como el nombre de la compania y el empleador
export const getEmploymentLetterReportById = (
  employee: ReportValues,
): TDocumentDefinitions => {
  //console.log(employee);
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = employee;
  //const { name } = options;
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    //Margins around the content on each page.
    pageMargins: [40, 60, 40, 60],
    // header: {
    //   //La primera columna sera el logo
    //   columns: [
    //     logo,
    //     {
    //       text: `${DateFormatter.getDDMMMMYYYY(new Date())}`,
    //       alignment: 'right',
    //       margin: [20, 20, 20, 20],
    //     },
    //   ],
    // },
    header: headerSection({
      title: 'el titulo',
      subTitle: 'subtitulo',
    }),
    content: [
      { text: `CONSTANCIA DE EMPLEO`, style: 'header' },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYYY(employeeStartDate)}.\n\n
        Durante su empleo, el Sr./Sra. ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
        La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n
        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },
      //   {
      //     text: `Atentamente,\n
      //     [Nombre del Empleador]\n
      //     [Cargo del Empleador]\n
      //     [Nombre de la Empresa]\n
      //     [Fecha de Emisión]`,
      //   },
      { text: `Atentamente`, style: 'signature' },
      { text: `${employerName}`, style: 'signature' },
      { text: `${employerPosition}`, style: 'signature' },
      { text: `${employerCompany}`, style: 'signature' },
      {
        text: `${DateFormatter.getDDMMMMYYYY(new Date())}`,
        style: 'signature',
      },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };
  return docDefinition;
};
