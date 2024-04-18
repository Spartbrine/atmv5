import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GeneralCredit } from '../../models/general-credit.model';

@Injectable({
  providedIn: 'root'
})
export class PartnersCreditsService {

  private http = inject(HttpClient)

  getCreditDebt(id: string)
  {
    const url = 'http://127.0.0.1:5000/pagarcreditos/'
    return this.http.get<GeneralCredit[]>(url + id)
  }
}
