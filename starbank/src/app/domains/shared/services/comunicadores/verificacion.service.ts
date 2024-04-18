import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private usuarioVerificadoSource = new Subject<boolean>();
  usuarioVerificado$ = this.usuarioVerificadoSource.asObservable();

  verificarUsuario(usuarioVerificado: boolean) {
    this.usuarioVerificadoSource.next(usuarioVerificado);
  }
}
