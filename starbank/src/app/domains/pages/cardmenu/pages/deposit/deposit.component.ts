import { Component, inject, signal } from '@angular/core';
import { DebitCardsaveService } from '../../../../shared/services/comunicadores/debit-cardsave.service';
import { DebitCardsService } from '../../../../shared/services/solicitudes/debit-cards.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { TransactionsService } from '../../../../shared/services/solicitudes/transactions.service';
import { Transaction } from '../../../../shared/models/transaction.model';
import { Partner } from '../../../../shared/models/partner.model';
import { error } from 'console';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  alertaDivisor : boolean = false
  permitirTransaccion : boolean = false
  dinero = signal<Number>(0);
  recuDeb = inject(DebitCardsaveService);
  doDeposit = inject(DebitCardsService);
  card = this.recuDeb.recuValDeb()?.card;
  router = inject(Router)

  changeDinero(event : Event)
  {
    const input = event.target as HTMLInputElement
    const valornuevo = parseInt(input.value)
    if(valornuevo % 50 == 0)
    {
      this.dinero.set(valornuevo);
      this.permitirTransaccion = true
      this.alertaDivisor= false
    } else {
      this.alertaDivisor = true
    }
  }
  depositar()
  {
    if(this.permitirTransaccion)
    {
      let cantidad = parseInt(this.dinero().toString());
      console.log('cantidad a depositar:', cantidad);
      if (this.card)
      {
        let actualizacion =
        {
          card: this.card,
          new_balance: cantidad,
          movement_type:"deposito"
        }
        localStorage.setItem('deposito', JSON.stringify(actualizacion));
        console.log('tarjeta a depositar', this.card);
        this.postTr()
        this.depo(actualizacion);
      }
    } else {
      alert('Cantidad no válida')
    }
  }

  depo(actualizacion : object)
  {
    console.log('deposito metodo');
    if(this.doDeposit.actualizarDebito(actualizacion).subscribe())
    {
      console.log('actualizacion');
      this.router.navigate(['/nota'])
    };
  }

  transacciones = inject(TransactionsService)

  postTr()
  {
    console.log('postTr')
    let valores = localStorage.getItem('socio')
    if(valores)
    {
      let usr: Partner[]= JSON.parse(valores)
      console.log(usr[0])
      console.log('id usr', usr[0].id)
      let tr : Transaction = {
      id_user:  usr[0].id,
      typeTransaction: 'DÉPOSITO',

    }
      console.log('id del usuario', tr)

      this.transacciones.postearTransaccion(tr).subscribe({})
    }

  }
}
