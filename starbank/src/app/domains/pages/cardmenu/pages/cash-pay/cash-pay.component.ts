import { Component, inject, signal } from '@angular/core';
import { TransactionsService } from '../../../../shared/services/solicitudes/transactions.service';
import { Partner } from '../../../../shared/models/partner.model';
import { Transaction } from '../../../../shared/models/transaction.model';
import { Router } from '@angular/router';
import { PartnersServicesService } from '../../../../shared/services/solicitudes/partners-services.service';
import { ServiceDebt } from '../../../../shared/models/service-debt.model';

@Component({
  selector: 'app-cash-pay',
  standalone: true,
  imports: [],
  templateUrl: './cash-pay.component.html',
  styleUrl: './cash-pay.component.css'
})
export class CashPayComponent {
  alertaDivisor : boolean = false
  permitirTransaccion : boolean = false
  dinero = signal('');
  router = inject(Router)
  servicio = localStorage.getItem('servicioAPagar')
  partnerService = inject(PartnersServicesService)
  transacciones = inject(TransactionsService)

  changeDinero(event : Event)
  {
    const input = event.target as HTMLInputElement
    const valornuevo = parseInt(input.value)
    if(valornuevo % 50 == 0)
    {
      this.dinero.set(valornuevo.toString());
      this.permitirTransaccion = true
      this.alertaDivisor= false
    } else if(valornuevo <= 0){
      alert('No puede pagar 0');
    }
    else {
      this.alertaDivisor = true
    }
  }

  pagar()
  {
    console.log('Metodo pagar')
    if(this.servicio)
    {
      console.log('Exisitio el servicio', this.servicio)
      if(this.permitirTransaccion)
      {
        let cantidad = parseInt(this.dinero().toString());
        console.log('cantidad a pagar:', cantidad);
        let JSONserv : ServiceDebt = JSON.parse(this.servicio)
        console.log('Deuda en el metodo pagar', JSONserv.debt)
        let resto = JSONserv.debt - cantidad
        let servicioPagado = {
          service_code : JSONserv.service_code,
          debt: resto
        }

        this.partnerService.pagarDeuda(servicioPagado).subscribe()
        console.log('240405')
        this.postTr()
        localStorage.setItem('pago de servicio', cantidad.toString())
        this.router.navigate(['/nota'])
      } else {
        alert('Cantidad no válida')
      }
    }

  }

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
      typeTransaction: 'PAGAR SERVICIO EN EFECTIVO'
      }
      console.log('objeto del usuario', tr)
      this.transacciones.postearTransaccion(tr).subscribe()
    }
  }
}
