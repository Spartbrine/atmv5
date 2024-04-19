import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-credit',
  standalone: true,
  imports: [],
  templateUrl: './car-credit.component.html',
  styleUrl: './car-credit.component.css'
})
export class CarCreditComponent {
  dinero = signal('');
  permitirTransaccion : boolean = false
  alertaDivisor : boolean = false

  changeDinero(event : Event)
  {
    const input = event.target as HTMLInputElement
    const valornuevo = parseInt(input.value)
    if(valornuevo % 50 == 0)
    {
      this.dinero.set(valornuevo.toString());
      this.permitirTransaccion = true
      this.alertaDivisor = false
    } else {
      this.alertaDivisor = true
    }
  }

  router = inject(Router)
  cancelar()
  {
    this.router.navigate(['/credits'])
  }

}
