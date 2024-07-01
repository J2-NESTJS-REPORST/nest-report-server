export class DateFormatter {
  //Creamos la propiedad de clase formatter que va a instanciar una sola vez el objeto Intl.DateTimeFormat al momento de cargar la clase en memoria y asi de esta manera no vamos a crear una instancia por cada llamada al metodo getDDMMMMYYYY().
  static formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static getDDMMMMYYYY(date: Date): string {
    return this.formatter.format(date);
  }
}
