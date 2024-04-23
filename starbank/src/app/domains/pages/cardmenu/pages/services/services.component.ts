import { Component, inject, signal } from '@angular/core';
import { ServiceDebt } from '../../../../shared/models/service-debt.model';
import { routes } from '../../../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services = signal<ServiceDebt[]>([])
  router = inject(Router)
  ngOnInit()
  {
    console.log('ejecutando init de services')
    this.obtenerServicios()
  }

  obtenerServicios()
  {
    console.log('metodo obtener servicios ejecutado')
    let localStorServicios = localStorage.getItem('servToPay')
    console.log('Servicios obtenidos de localStorage:', localStorServicios);
    if(localStorServicios)
    {
      let JSONservs : ServiceDebt[] = JSON.parse(localStorServicios)
      console.log(JSONservs)
      this.services.set(JSONservs)
    }
  }

  redireccionarClick(nombre? : string)
  {
    if (nombre == 'CFE')
    {
      this.router.navigate(['services/cfe'])
    }
    else if(nombre == 'NETFLIX')
    {
      this.router.navigate(['services/netflix'])

    }
    else if(nombre == 'TELMEX')
    {
      this.router.navigate(['services/telmex'])

    }
    else if(nombre == 'JAPAY')
    {
      this.router.navigate(['services/japay'])

    }
    else if(nombre == 'SPOTIFY')
    {
      this.router.navigate(['services/spotify'])

    }
  }

}
