import { Component, inject, signal } from '@angular/core';
import { TransactionsService } from '../../../../shared/services/solicitudes/transactions.service';
import { Partner } from '../../../../shared/models/partner.model';
import { Transaction } from '../../../../shared/models/transaction.model';
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
    this.cambiarOrden('asc')
  }

  cambiarOrden(identificador: string) {
    console.log('Cambiando orden a:', identificador);
    if (identificador === "asc") {
        let transactions = localStorage.getItem('transaccionesASC[]');
        if (transactions) {
            this.transaccions.set(JSON.parse(transactions) as Transaction[]);
            console.log('Transacciones ascendentes recuperadas:', this.transaccions);
        }
    } else if (identificador === "desc") {
        let transactions = localStorage.getItem('transaccionesDESC[]');
        if (transactions) {
            this.transaccions.set(JSON.parse(transactions) as Transaction[]);
            console.log('Transacciones descendentes recuperadas:', this.transaccions);
        }
    } else {
        console.error('Identificador de orden no válido:', identificador);
    }
}

}
