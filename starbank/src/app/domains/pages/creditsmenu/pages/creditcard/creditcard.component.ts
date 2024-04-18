import { Component, inject } from '@angular/core';
import { CreditCardsService } from '../../../../shared/services/solicitudes/credit-cards.service';
import { creditCard } from '../../../../shared/models/creditCard.model';
import { CardsService } from '../../../../shared/services/solicitudes/cards.service';
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
  tdc : creditCard | null = null
  tarjeta : Card | null = null
  pago : number = 0
  ngOnInit()
  {
    this.obtenerTarjeta();
  }
  ngOnCHanges()
  {
    this.obtenerTarjeta()
  }
  obtenerTarjeta()
  {
    this.tarjeta = this.cardSv.recuperarTarjeta()
    if(this.tarjeta != null)
    {
      this.creditSv.obtenerTarjeta(this.tarjeta.card).subscribe((tarjeta : creditCard)=>{
        this.tdc = tarjeta
      })
    }
  }

  pagarTarjeta()
  {
    if(this.tdc)
    {
      if(this.tdc.creditLimit !<= this.tdc.creditAvailable)
      {

      }
    }


  }
}
