import { Injectable, inject } from '@angular/core';
import { creditCard } from '../../models/creditCard.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreditCardsService {
  private http = inject(HttpClient);
  obtenerTarjeta(card: string)
  {
    return this.http.get<creditCard>(`http://127.0.0.1:5000/tarjetas/credito/${card}`)
  }

  actualizarCredito(actVal : object)
  {
    console.log('actualizar credito actVal', actVal)
    return this.http.put<creditCard>(`http://127.0.0.1:5000/tarjetas/credito`, actVal).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: any): Observable<any> {
    console.error('Hubo un error:', error);
    return throwError(error); // Manejar errores de manera apropiada
  }
}
