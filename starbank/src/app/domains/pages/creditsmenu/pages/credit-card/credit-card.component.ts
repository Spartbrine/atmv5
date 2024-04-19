import { Component, inject, signal } from '@angular/core';
import { CreditCardsService } from '../../../../shared/services/solicitudes/credit-cards.service';
import { creditCard } from '../../../../shared/models/creditCard.model';
import { CardsaveService } from '../../../../shared/services/comunicadores/cardsave.service';
import { Card } from '../../../../shared/models/card.model';
import { TransactionsService } from '../../../../shared/services/solicitudes/transactions.service';
import { Partner } from '../../../../shared/models/partner.model';
import { Transaction } from '../../../../shared/models/transaction.model';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent {
  //Si el credito disponible es menor al limite se puede seguir pagando, si no ya no puede pagar masxd
  cardSv = inject(CardsaveService);
  creditSv = inject(CreditCardsService)
  tdc = signal<creditCard|null>(null)
  alertaDivisor : boolean = false
  dinero = signal('');
  permitirTransaccion : boolean = false
  saldo = 0

  ngOnInit()
  {
    console.log('Ejecutando OnInit');
    this.obtenerTarjeta();
  }

  obtenerTarjeta()
  {
    let valores = localStorage.getItem('valcred');
    if(valores)
    {
      let tarjetaValores : creditCard[] = JSON.parse(valores);
      this.tdc.set(tarjetaValores[0]);
      this.saldo = parseInt(tarjetaValores[0].creditLimit) - parseInt(tarjetaValores[0].creditAvailable)
      console.log('dntro de tarjeta', tarjetaValores[0]);
    }

  }

  abonoTarjeta()
  {
    this.postTr('ABONO A TARJETA CREDITO');
    console.log('Abonando');
    let valores = localStorage.getItem('valcred');
    if(valores)
    {
      let tarjetaValores : creditCard[] = JSON.parse(valores);
      let objeto = {
        card: tarjetaValores[0].card,
        creditAvailable: parseInt(tarjetaValores[0].creditAvailable) + this.dinero()
      }
      console.log('Objeto enviado', objeto);
      this.creditSv.actualizarCredito(objeto);
    }

  }

  pagarTarjeta()
  {
    this.postTr('PAGO TOTAL TARJETA CREDITO');
    console.log('pagando');
    let valores = localStorage.getItem('valcred');
    if(valores)
    {
      let tarjetaValores : creditCard[] = JSON.parse(valores);
      let objeto = {
        card: tarjetaValores[0].card,
        creditAvailable: parseInt(tarjetaValores[0].creditLimit) - parseInt(tarjetaValores[0].creditAvailable)
      }
      console.log('Objeto enviado', objeto)
      this.creditSv.actualizarCredito(objeto)
    }
  }

  changeDinero(event : Event)
  {
    const input = event.target as HTMLInputElement
    const valornuevo = parseInt(input.value)
    if(valornuevo % 50 == 0)
    {
      this.dinero.set(valornuevo.toString());
      this.permitirTransaccion = true
      this.alertaDivisor= false
    } else {
      this.alertaDivisor = true
    }
  }

  transacciones = inject(TransactionsService);

  postTr(tipo : string)
  {
    console.log('postTr');
    let valores = localStorage.getItem('socio');
    if(valores)
    {
      let usr: Partner[]= JSON.parse(valores);
      console.log(usr[0]);
      console.log('id usr', usr[0].id);
      let tr : Transaction = {
        id_user:  usr[0].id,
        typeTransaction:tipo
      };
      console.log('Objeto tr', tr);
      this.transacciones.postearTransaccion(tr).subscribe({});
    }

  }
}
