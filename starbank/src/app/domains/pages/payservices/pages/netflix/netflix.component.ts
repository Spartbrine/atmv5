import { Component, inject, signal } from '@angular/core';
import { service } from '../../../../shared/models/service.model';
import { ServicesService } from '../../../../shared/services/solicitudes/services.service';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-netflix',
  standalone: true,
  imports: [],
  templateUrl: './netflix.component.html',
  styleUrl: './netflix.component.css'
})
export class NetflixComponent {

  service = signal<service[]>([]);

  private servicesService = inject(ServicesService);

  ngOnInit()
  {
    this.obtenerServicio();
    console.log(this.service);
    console.log('servicios');
  }

  obtenerServicio()
  {

    this.servicesService.getServiceById('1').subscribe
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
