export class CurrencyFormatter {
  //Creamos la propiedad de clase formatter que va a instanciar una sola vez el objeto Intl.NumberFormat al momento de cargar la clase en memoria y asi de esta manera no vamos a crear una instancia por cada llamada al metodo getCurrencyFormat().
  static formatter = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
  });

  static getCurrencyFormat(value: number): string {
    return this.formatter.format(value);
  }
}
