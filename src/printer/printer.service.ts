import { Injectable } from '@nestjs/common';
import pdfMakePrinter from 'pdfmake';
import {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
const fonts = {
  Roboto: {
    normal: './fonts/Roboto-Regular.ttf',
    bold: './fonts/Roboto-Medium.ttf',
    italics: './fonts/Roboto-Italic.ttf',
    bolditalics: './fonts/Roboto-MediumItalic.ttf',
  },
};

const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#bbbbbb';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fillColor: (i, node) => {
      //Pintamos la primera filas que es el header
      if (i === 0) {
        return '#7b90be';
      }
      if (i === node.table.body.length - 1) {
        return '#7b90be';
      }
      //si es par pintamos gris
      return i % 2 === 0 ? '#f3f3f3' : null;
    },
  },
};
@Injectable()
export class PrinterService {
  private printer = new pdfMakePrinter(fonts);
  async createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts,
    },
  ): Promise<PDFKit.PDFDocument> {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
