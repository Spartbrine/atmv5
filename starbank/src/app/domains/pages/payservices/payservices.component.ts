import { Component, Input, Output, inject, signal, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { service } from '../../shared/models/service.model';
import { ServicesService } from '../../shared/services/solicitudes/services.service';
import { RouterLinkWithHref } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-payservices',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule],
  templateUrl: './payservices.component.html',
  styleUrls: ['./payservices.component.css'],
  providers: [ServicesService]
})

export class PayservicesComponent
{
  services = signal<service[]>([]);

  servicio = signal<service[]>([]);

  @Output() addService = new EventEmitter();

  @Input({required: true}) service! : service //Essto es para que reciba cosas xd

  private servicesService = inject(ServicesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  ngOnInit()
  {
    this.getServices();

  }

  serviceHandler()
  {
    this.addService.emit(this.service);
  }


  private getServices()
   {
    this.servicesService.getAllServices()
    .subscribe
    (
      {
        next:(data) =>
        {
          this.services.set(data);
        },
        error: ()=>{}
      }
    )
   }
   private getServiceById(id: string)  {
    this.servicesService.getServiceById(id)
    .subscribe({
      next: (servicio) =>
      {
        this.servicio.set(servicio);
      },
      error:()=>{}
    });
  }

  goToService(id: string) {
    this.getServiceById(id);
    this.router.navigate(['/servicecode', id]);
  }

  goToLog()
  {

  }

}

