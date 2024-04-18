import { Injectable, inject } from '@angular/core';
import { Partner } from '../../models/partner.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private http = inject(HttpClient);
  protected socios : Partner[]=[];

  getSocio(socio : string)
  {
    return this.http.get<Partner[]>(`http://127.0.0.1:5000/socios/${socio}`)
  }

}
