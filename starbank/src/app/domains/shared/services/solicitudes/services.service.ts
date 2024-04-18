import { Injectable, inject } from '@angular/core';
import { service } from '../../models/service.model';
import { HttpClient } from '@angular/common/http';
import { ServiceDebt } from '../../models/service-debt.model';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private http = inject(HttpClient);
  constructor() { }

  getAllServices()
  {
    return this.http.get<service[]>('http://127.0.0.1:5000/servicios')
  }
  getServiceById(id: string)
  {
    return this.http.get<service[]>('http://127.0.0.1:5000/servicios/' + id);
  }
  // /pagarservicios/<int:id_user>
  getServiceDebt(id_user: string)
  {
    return this.http.get<ServiceDebt[]>('http://127.0.0.1:5000/pagarservicios/' + id_user);
  }

}
