import { Component, inject } from '@angular/core';
import { ServiceDebt } from '../../../../../../shared/models/service-debt.model';
import { Router } from '@angular/router';
import { CreditCardsService } from '../../../../../../shared/services/solicitudes/credit-cards.service';
import { DebitCardsService } from '../../../../../../shared/services/solicitudes/debit-cards.service';
import { debitCard } from '../../../../../../shared/models/debitCard.model';
import { creditCard } from '../../../../../../shared/models/creditCard.model';
import { PartnersServicesService } from '../../../../../../shared/services/solicitudes/partners-services.service';
import { TransactionsService } from '../../../../../../shared/services/solicitudes/transactions.service';
import { Partner } from '../../../../../../shared/models/partner.model';
import { Transaction } from '../../../../../../shared/models/transaction.model';
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
  tarCred : creditCard[] = []
  tarDeb :  debitCard[] = []
  creditCardService = inject(CreditCardsService)
  debitCardService = inject(DebitCardsService)
  partnerService = inject(PartnersServicesService)
  ngOnInit()
  {
    this.getServ()
    let cred = localStorage.getItem('valcred')
    let deb = localStorage.getItem('valdeb')
    if(cred)
    {
      this.tarCred = JSON.parse(cred)
    }
    else if(deb)
    {
      this.tarDeb = JSON.parse(deb)
    }
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

  descontarTarjeta()
  {
    let obj
    console.log('Tarjeta de credito', this.tarCred, 'Tarjeta de debito', this.tarDeb)
    console.log('Servicio asignado', this.servicio)
    if(this.tarCred[0] != null && this.servicio)
    {
      console.log('Tarjeta en el valor ')
       obj = {
        card: this.tarCred[0].card,
        creditAvailable: parseInt(this.tarCred[0].creditAvailable) - this.servicio.debt
      }
      if(this.creditCardService.actualizarCredito(obj).subscribe())
      {
        let servicioPagado = {
          service_code : this.servicio.service_code,
          debt: 0
        }

        this.partnerService.pagarDeuda(servicioPagado).subscribe()
        console.log('objeto dentro del if', obj)
        localStorage.setItem('pago de servicio', JSON.stringify(this.servicio.debt))
        this.postTr()
        this.router.navigate(['/nota'])
      }
    }
    else if(this.tarDeb[0] != null && this.servicio)
    {
      console.log('Valor de balance de la tarjeta', this.tarDeb[0].balance)
       obj = {
        card: this.tarDeb[0].card,
        new_balance: this.servicio.debt,
        movement_type : "retiro"
      }
      if(this.debitCardService.actualizarDebito(obj).subscribe())
      {
        let servicioPagado = {
          service_code : this.servicio.service_code,
          debt: 0
        }
        this.partnerService.pagarDeuda(servicioPagado).subscribe()
        console.log('objeto dentro del if', obj)
        localStorage.setItem('pago de servicio', JSON.stringify(this.servicio.debt))
        this.postTr()
        this.router.navigate(['/nota'])
      }

    }
    console.log('Objeto al final', obj)
  }
  transacciones = inject(TransactionsService)
  postTr()
  {
    console.log('postTr')
    let valores = localStorage.getItem('socio')
    if(valores)
    {
      let usr: Partner[]= JSON.parse(valores)
      console.log(usr[0])
      console.log('id usr', usr[0].id)

      let tr : Transaction = {
      id_user:  usr[0].id,
      typeTransaction: 'PAGAR SERVICIO CON TARJETA'
      }
      console.log('objeto del usuario', tr)
      this.transacciones.postearTransaccion(tr).subscribe()
    }
  }

  router = inject(Router);


  regresar()
  {
    this.router.navigate(['/cards']);
  }
}
