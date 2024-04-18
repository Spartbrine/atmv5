import { Component, inject, signal } from '@angular/core';
import { service } from '../../../../shared/models/service.model';
import { ServicesService } from '../../../../shared/services/solicitudes/services.service';
import { ServiceDebt } from '../../../../shared/models/service-debt.model';
import { CardsaveService } from '../../../../shared/services/comunicadores/cardsave.service';
import { debitCard } from '../../../../shared/models/debitCard.model';
import { creditCard } from '../../../../shared/models/creditCard.model';
import { Card } from '../../../../shared/models/card.model';
import { DebitCardsService } from '../../../../shared/services/solicitudes/debit-cards.service';
import { CreditCardsService } from '../../../../shared/services/solicitudes/credit-cards.service';
import { PartnersServicesService } from '../../../../shared/services/solicitudes/partners-services.service';
@Component({
  selector: 'app-japay',
  standalone: true,
  imports: [],
  templateUrl: './japay.component.html',
  styleUrl: './japay.component.css'
})
export class JapayComponent {
  service = signal<service[]>([]);
  contrato = signal<ServiceDebt|null>(null);
  private metodoPago = inject(CardsaveService)
  private debPag = inject(DebitCardsService)
  private credPag = inject(CreditCardsService)
  private contractService = inject(PartnersServicesService)
  usuario : string = ''
  tarjeta : Card | null = null
  tarDeb : debitCard | null = null
  tarCred : creditCard | null = null
  private servicesService = inject(ServicesService);

  ngOnInit()
  {
    this.obtenerServicio();
    this.obtenerMetodoPago()
  }

  ngAfterViewInit()
  {
   this.contractService.getOneDebtUSr(this.usuario).subscribe((cont : ServiceDebt) =>
   {
    this.contrato.set(cont)
   })
  }

  obtenerServicio()
  {

    this.servicesService.getServiceById('3').subscribe
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


  obtenerMetodoPago()
  {
    this.tarjeta = this.metodoPago.recuperarTarjeta()
    if(this.tarjeta != null)
    {
    this.usuario = this.tarjeta?.id_user
      if(this.tarjeta.typeCard == 'DEBITO')
      {
        let verif
        verif =  this.debPag.obtenerTarjeta(this.tarjeta.card)
        if(verif)
        {
          verif.subscribe({
            next: (valor) =>
            {
              this.tarDeb = valor;
            }
          })
        }
      }
      else if (this.tarjeta.typeCard == 'CREDITO')
      {
        let verif
        verif =  this.credPag.obtenerTarjeta(this.tarjeta.card)
        if(verif)
        {
          verif.subscribe({
            next: (valor) =>
            {
              this.tarCred = valor;
            }
          })
        }
      }
    }
  }

}
