import { Component, inject, signal } from '@angular/core';
import { service } from '../../../../shared/models/service.model';
import { ServicesService } from '../../../../shared/services/solicitudes/services.service';
@Component({
  selector: 'app-spotify',
  standalone: true,
  imports: [],
  templateUrl: './spotify.component.html',
  styleUrl: './spotify.component.css'
})
export class SpotifyComponent {
  service = signal<service[]>([]);

  private servicesService = inject(ServicesService);

  ngOnInit()
  {
    this.obtenerServicio();
  }

  obtenerServicio()
  {

    this.servicesService.getServiceById('2').subscribe
    (
      {
        next: (servicio)  =>
        {
          this.service.set(servicio);
          console.log(servicio);
          console.log('nombre:', this.service.name)
          console.log('Objeto:', this.service())
        }
      }
    )
  }

}
