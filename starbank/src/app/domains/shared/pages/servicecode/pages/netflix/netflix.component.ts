import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDebt } from '../../../../models/service-debt.model';
import { creditCard } from '../../../../models/creditCard.model';
import { debitCard } from '../../../../models/debitCard.model';
import { CreditCardsService } from '../../../../services/solicitudes/credit-cards.service';
import { DebitCardsService } from '../../../../services/solicitudes/debit-cards.service';

@Component({
  selector: 'app-netflix',
  standalone: true,
  imports: [],
  templateUrl: './netflix.component.html',
  styleUrl: './netflix.component.css'
})
export class NetflixComponent {
  nombre = 'NETFLIX'
  servicios = localStorage.getItem('servicio')
  servicio : ServiceDebt | null = null
  ngOnInit()
  {
    this.getServ()
  }
  getServ()
  {
    let nomb = this.nombre
    if(this.servicios)
    {
      let serv : ServiceDebt[]= JSON.parse(this.servicios)
      let servicioExistente = serv.find(function(servicio){
        return servicio.name == nomb
      })
      if(servicioExistente!=undefined)
      this.servicio = servicioExistente
      console.log('Servicio con datos', servicioExistente)
    }
    console.log('servicios en el getServ', this.servicio)

  }
  redirigirEfectivo()
  {
    if(this.servicio)
    {
      let nombreLink = this.nombre.toLowerCase();
      let obj = {
        service_code : this.servicio.service_code,
        debt : this.servicio.debt
      }
      localStorage.setItem('servicioAPagar', JSON.stringify(obj));
      this.router.navigate([`/services/${nombreLink}/pagarEfectivo`]); //Falta por modificar esta parte
    }
  }

  router = inject(Router);

  regresar()
  {
    this.router.navigate(['/']);
  }

}
