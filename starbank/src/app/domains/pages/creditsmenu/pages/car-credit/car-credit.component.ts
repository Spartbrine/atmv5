import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralCreditsaveService } from '../../../../shared/services/comunicadores/general-creditsave.service';
import { PartnersCreditsService } from '../../../../shared/services/solicitudes/partners-credits.service';

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

  ngOnInit()
  {

  }

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
  abonoCapital()
  {

  }

  mensualidad()
  {

  }

  router = inject(Router)
  cancelar()
  {
    this.router.navigate(['/credits'])
  }

}
