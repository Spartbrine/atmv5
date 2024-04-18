import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ServiceDebt } from '../../models/service-debt.model';

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

}
