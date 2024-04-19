import { Component } from '@angular/core';
import { ServiceDebt } from '../../../../../../shared/models/service-debt.model';

@Component({
  selector: 'app-spotify',
  standalone: true,
  imports: [],
  templateUrl: './spotify.component.html',
  styleUrl: './spotify.component.css'
})
export class SpotifyComponent {
  nombre = 'SPOTIFY'
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
}
