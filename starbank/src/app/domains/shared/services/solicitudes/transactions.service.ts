import { Injectable, inject } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private http = inject(HttpClient);

  getTransactionsByUser(id_user: string)
  {
    return this.http.get<Transaction[]>('http://127.0.0.1:5000/transacciones/' + id_user)
  }

  //Para el post debo mandar el tipo de transaccion y el id del usuario
  postearTransaccion(transaccion : Transaction)
  {
    return this.http.post<Transaction>('http://127.0.0.1:5000/transacciones', transaccion)
  }

}
