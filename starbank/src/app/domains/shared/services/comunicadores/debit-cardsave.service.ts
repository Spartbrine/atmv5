import { Injectable } from '@angular/core';
import { debitCard } from '../../models/debitCard.model';

@Injectable({
  providedIn: 'root'
})
export class DebitCardsaveService {
  guardarValoresDebito(valores : debitCard)
  {
    const jsonValDeb = JSON.stringify(valores);
    localStorage.setItem('valdeb', jsonValDeb);
  }

  recuValDeb() : debitCard | null
  {
    const jsonValDeb = localStorage.getItem('valdeb');
    console.log('valors deb en dbs', jsonValDeb);
    if(jsonValDeb)
    {
      const valores : debitCard[] = JSON.parse(jsonValDeb);
      if(valores.length > 0)
      {
        console.log('valores del debito', valores[0])
        return valores[0]
      }
      else{
        console.log('no se encontraron los valores correctamente');
        return null
      }
    }
    else
    {
      return null
    }
  }
}
