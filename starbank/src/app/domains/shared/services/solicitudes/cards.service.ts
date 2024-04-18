import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Card } from '../../models/card.model';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private http = inject(HttpClient);
  protected  tarjetas : Card[] = [];

  getOneCard(card:string)
  {
    return this.http.get<Card>(`http://127.0.0.1:5000/tarjetas/${card}`)
  }

  getAllCards()
  {
    return this.http.get<Card[]>(`http://127.0.0.1:5000/tarjetas`)
  }

  obtenerTarjeta(card: string)
  {
    return this.http.get<Card>(`http://127.0.0.1:5000/tarjetas/${card}`)
  }

  cambiarNIP(tarjeta: Card): Observable<Card> {
    const url = 'http://127.0.0.1:5000/tarjetas';
    return this.http.put<Card>(url, tarjeta)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error:', error);
    return throwError(error); // Manejar errores de manera apropiada
  }
  recuTarjetas(): void {
    this.getAllCards().subscribe(
      (datos) => {
        this.tarjetas = datos;
      }
    );
  }
}

