import { Component, inject } from '@angular/core';
import { ServiceDebt } from '../../../../../../shared/models/service-debt.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-netflix',
  standalone: true,
  imports: [],
  templateUrl: './netflix.component.html',
  styleUrl: './netflix.component.css'
})
export class NetflixComponent {
  nombre = 'NETFLIX'
  servicios = localStorage.getItem('servToPay')
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
      this.router.navigate([`/services/${nombreLink}/pagarEfectivo`]);
    }
  }

  router = inject(Router);


  regresar()
  {
    this.router.navigate(['/cards']);
  }

}
