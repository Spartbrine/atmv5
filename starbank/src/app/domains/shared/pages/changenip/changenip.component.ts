import { Component, inject, signal } from '@angular/core';
import { NiploginComponent } from '../niplogin/niplogin.component';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../models/card.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CardsService } from '../../services/solicitudes/cards.service';

@Component({
  selector: 'app-changenip',
  standalone: true,
  imports: [],
  templateUrl: './changenip.component.html',
  styleUrl: './changenip.component.css'
})
export class ChangenipComponent {
  private http = inject(HttpClient)
  nip = signal('')
  router = inject(Router)
  cardService = inject(CardsService)
  changeNip(event: Event) {
    console.log('Cambio en el campo de NIP. Actualizando valor del NIP.');
    const input = event.target as HTMLInputElement;
    const valorNuevo = input.value;
    this.nip.set(valorNuevo);
    console.log('Nuevo valor de NIP:', this.nip());
    this.submitNIP()
  }

  submitNIP() : void
  {
    const tarjetas = localStorage.getItem('tarjeta')
    if (tarjetas)
    {
      let tarjetasD : Card[] = JSON.parse(tarjetas)
      if(tarjetasD)
      {
        let tarjeta = tarjetasD[0]
        tarjeta.nip = this.nip()
        console.log('tarjeta enviada', tarjeta)
        this.cardService.cambiarNIP(tarjeta).subscribe()
        this.router.navigate(['/cards'])
      }
    }
  }
}
