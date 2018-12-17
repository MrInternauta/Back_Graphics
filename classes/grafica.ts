export class graficaData{

  private meses: string[] =  ['enero', 'febrero', 'marzo', 'abril'];
  private valores: number[] =  [1,2,2,1];
  constructor(){

  }

  getdata(){
    return [
      {data: this.valores, label: 'Ventas'}
    ]
  }
  incementarvalor(mes: string, valor: number){
    mes = mes.toLowerCase().trim();
    for(let i in this.meses){
      if( this.meses[i] === mes) {
        this.valores[i] += valor;
      }
    }
    return this.getdata();
  }



}
