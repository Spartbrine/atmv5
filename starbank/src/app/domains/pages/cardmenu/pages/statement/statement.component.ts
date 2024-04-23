import { Component, inject, signal } from '@angular/core';
import { TransactionsService } from '../../../../shared/services/solicitudes/transactions.service';
import { CardsaveService } from '../../../../shared/services/comunicadores/cardsave.service';
import { Partner } from '../../../../shared/models/partner.model';
import { Transaction } from '../../../../shared/models/transaction.model';
import { sign } from 'crypto';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.css'
})
export class StatementComponent {
  obtenerTransacciones = inject(TransactionsService)
  partner : Partner | null = null
  transaccions = signal<Transaction[]>([])

  ngOnInit()
  {
    let transactions = localStorage.getItem('transaccionesASC[]')
    if(transactions)
    {
      this.transaccions.set(JSON.parse(transactions))
      console.log('Transacciones recuperadas:', this.transaccions)
    }
  }

  cambiarOrden(identificador : number)
  {
    if(identificador == 1)
    {
      let transactions = localStorage.getItem('transaccionesASC[]')
      if(transactions)
      {
        this.transaccions.set(JSON.parse(transactions))
        console.log('Transacciones recuperadas:', this.transaccions)
      }
    } else{
      let transactions = localStorage.getItem('transaccionesDESC[]')
      if(transactions)
      {
        this.transaccions.set(JSON.parse(transactions))
        console.log('Transacciones recuperadas:', this.transaccions)
      }
    }
  }




}
