import { Component, inject, signal } from '@angular/core';
import { service } from '../../../../shared/models/service.model';
import { ServicesService } from '../../../../shared/services/solicitudes/services.service';

@Component({
  selector: 'app-cfe',
  standalone: true,
  imports: [],
  templateUrl: './cfe.component.html',
  styleUrl: './cfe.component.css'
})
export class CfeComponent {
  service = signal<service[]>([]);

  private servicesService = inject(ServicesService);

  ngOnInit()
  {
    this.obtenerServicio();
  }

  obtenerServicio()
  {

    this.servicesService.getServiceById('4').subscribe
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
