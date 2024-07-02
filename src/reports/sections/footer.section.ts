import { Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  //pageSize: ContextPageSize,
): Content => {
  return {
    text: currentPage.toString() + ' of ' + pageCount,
    alignment: 'right',
    //izquierda,arriba,derecha,abajo
    margin: [0, 10, 35, 0],
    bold: true,
    fontSize: 12,
  };
};
