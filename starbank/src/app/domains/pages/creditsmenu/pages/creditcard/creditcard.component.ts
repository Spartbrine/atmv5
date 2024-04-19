import { Component, inject, signal } from '@angular/core';
import { CreditCardsService } from '../../../../shared/services/solicitudes/credit-cards.service';
import { creditCard } from '../../../../shared/models/creditCard.model';
import { CardsaveService } from '../../../../shared/services/comunicadores/cardsave.service';
import { Card } from '../../../../shared/models/card.model';

@Component({
  selector: 'app-creditcard',
  standalone: true,
  imports: [],
  templateUrl: './creditcard.component.html',
  styleUrl: './creditcard.component.css'
})
export class CreditcardComponent {
  //Si el credito disponible es menor al limite se puede seguir pagando, si no ya no puede pagar masxd
  cardSv = inject(CardsaveService);
  creditSv = inject(CreditCardsService)
  tdc = signal<creditCard|null>(null)
  tarjeta : Card | null = null
  pago : number = 0

  ngOnInit()
  {
    console.log('Ejecutando OnInit')
    this.obtenerTarjeta();
  }

  obtenerTarjeta()
  {
    let valores = localStorage.getItem('valcred');
    if(valores)
    {
      let tarjetaValores : creditCard = JSON.parse(valores)
      this.tdc.set(tarjetaValores)
      console.log('dntro de tarjeta')
    }
  }

  pagarTarjeta()
  {

  }
}
