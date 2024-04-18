import { Component, signal } from '@angular/core';
import { ServiceDebt } from '../../../../shared/models/service-debt.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services = signal<ServiceDebt[]>([])

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
}
