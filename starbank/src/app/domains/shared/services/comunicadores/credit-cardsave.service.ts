import { Injectable } from '@angular/core';
import { creditCard } from '../../models/creditCard.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardsaveService {

  guardarValoresCredito(valores : creditCard)
  {
    const jsonValDeb = JSON.stringify(valores);
    localStorage.setItem('valcred', jsonValDeb);
  }

  recuValCred() : creditCard | null
  {
    console.log('valcred recuperar method');
    const jsonValDeb = localStorage.getItem('valcred');
    if(jsonValDeb)
    {
      const valores : creditCard[] = JSON.parse(jsonValDeb);
      if(valores.length > 0)
      {
        console.log('valores del credito', valores[0])
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
