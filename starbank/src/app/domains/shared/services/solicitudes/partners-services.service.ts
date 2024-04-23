import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ServiceDebt } from '../../models/service-debt.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnersServicesService {

  private http = inject(HttpClient)
  protected debt : ServiceDebt [] = []

  getOneDebtUSr(id : string)
  {
    const url = 'http://127.0.0.1:5000/pagarservicios/codigo/'
    return this.http.get<ServiceDebt>(url + id)
  }

  pagarDeuda(servicio: object)
  {
    //Ya tengo que enviar como quedaria la deuda, pues en el api no hago la operación al usar un metodo "general"
    console.log('servicio en parterservs s', servicio)
    return this.http.put<ServiceDebt>(`http://127.0.0.1:5000/pagarservicios`, servicio).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error:', error);
    return throwError(error); // Manejar errores de manera apropiada
  }

}
