import { Injectable } from '@nestjs/common';
import pdfMakePrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
const fonts = {
  Roboto: {
    normal: './fonts/Roboto-Regular.ttf',
    bold: './fonts/Roboto-Medium.ttf',
    italics: './fonts/Roboto-Italic.ttf',
    bolditalics: './fonts/Roboto-MediumItalic.ttf',
  },
};
@Injectable()
export class PrinterService {
  private printer = new pdfMakePrinter(fonts);
  async createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): Promise<PDFKit.PDFDocument> {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
