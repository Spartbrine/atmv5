import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  private http = inject(HttpClient)
  enviarCorreo()
  {
    return this.http.get('http://127.0.0.1:5000/enviar-correo').pipe()
  }
}
