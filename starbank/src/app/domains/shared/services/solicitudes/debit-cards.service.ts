import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debitCard } from '../../models/debitCard.model';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DebitCardsService {
  private http = inject(HttpClient);
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
})};
  obtenerTarjeta(card: string)
  {
    return this.http.get<debitCard>(`http://127.0.0.1:5000/tarjetas/debito/${card}`);
  }

  actualizarDebito(actVal : object)
  {
    console.log('actualizar debito actVal', actVal)
    return this.http.put<debitCard>(`http://127.0.0.1:5000/tarjetas/debito`, actVal).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error:', error);
    return throwError(error); // Manejar errores de manera apropiada
  }
}

