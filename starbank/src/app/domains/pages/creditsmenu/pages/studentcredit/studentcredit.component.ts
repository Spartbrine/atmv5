import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PartnersCreditsService } from '../../../../shared/services/solicitudes/partners-credits.service';
import { GeneralCredit } from '../../../../shared/models/general-credit.model';
import { Partner } from '../../../../shared/models/partner.model';
import { Transaction } from '../../../../shared/models/transaction.model';
import { TransactionsService } from '../../../../shared/services/solicitudes/transactions.service';
@Component({
  selector: 'app-studentcredit',
  standalone: true,
  imports: [],
  templateUrl: './studentcredit.component.html',
  styleUrl: './studentcredit.component.css'
})
export class StudentcreditComponent {
  dinero = signal('');
  permitirTransaccion : boolean = false
  alertaDivisor : boolean = false
  creditos = localStorage.getItem('Creditos_credautomovil')
  partnerCreditoService = inject(PartnersCreditsService)
  credito : GeneralCredit | null = null
  mensualidad : number = 0
  ngOnInit()
  {
    this.getCredit()
    this.calcularMensualidad()
  }

  changeDinero(event : Event)
  {
    const input = event.target as HTMLInputElement
    const valornuevo = parseInt(input.value)
    if(valornuevo % 50 == 0)
    {
      this.dinero.set(valornuevo.toString());
      this.permitirTransaccion = true
      this.alertaDivisor = false
    } else {
      this.alertaDivisor = true
    }
  }

  getCredit()
  {
    if(this.creditos)
    {
      let credito : GeneralCredit[] = JSON.parse(this.creditos)
      if(credito)
      {
        this.credito = credito[0]
        console.log('MEses a pagar', credito[0].MonthsDebt)
      }
    }
  }

  abonoCapital()
  {
    console.log('Boton abono a capital')
    if(parseInt(this.dinero()) <= this.mensualidad)
    {
      console.log('No paso el if')
      alert(`El pago a capital debe ser mayor que su mensualidad que es: ${this.mensualidad}`)
      if(this.credito)
        {
          let objeto = {
            id: this.credito.id,
            debt: this.credito.debt - parseInt(this.dinero())
          }
          console.log('Actualización enviada', objeto)
          this.partnerCreditoService.pagarCredito(objeto).subscribe()
          let objetoNota = {
            debt: this.dinero,
            creditoFaltante: objeto.debt
          }
          localStorage.setItem('pago de credito general', JSON.stringify(objetoNota))
          this.postTr('Abono a capital de credito')
          this.router.navigate(['/nota'])
        }
    }
  }

  abonoMensualidad()
  {
    if(this.credito)
    {
      let objeto = {
        id: this.credito.id,
        debt: this.credito.debt - this.mensualidad
      }
      console.log('Actualización enviada', objeto)
      this.partnerCreditoService.pagarCredito(objeto).subscribe()
      let objetoNota = {
        debt: this.mensualidad,
        creditoFaltante: objeto.debt
      }
      localStorage.setItem('pago de credito general', JSON.stringify(objetoNota))
      this.postTr('Abono de mensualidad de credito')
      this.router.navigate(['/nota'])
    }
  }

  calcularMensualidad()
  {
    if(!this.credito){console.log('NO existio el credito')} else
    {
      let mesesNum =  parseInt(this.credito.MonthsDebt)
      this.mensualidad = (((this.credito.debt * .14) /mesesNum) + (this.credito.debt/mesesNum) + ((this.credito.debt*.16)/mesesNum))
      let mensualidadRedondeada = this.mensualidad.toFixed(2)
      this.mensualidad = parseInt(mensualidadRedondeada)
      console.log('Mensualidad calculada:', this.mensualidad)
    }
  }

  transacciones = inject(TransactionsService)
  postTr(tipo: string)
  {
    let valores = localStorage.getItem('socio')
    if(valores)
    {
      let usr: Partner[] = JSON.parse(valores)
      let transaccion : Transaction = {
        id_user: usr[0].id,
        typeTransaction:tipo
      }

      this.transacciones.postearTransaccion(transaccion).subscribe()
    }
  }



  router = inject(Router)
  cancelar()
  {
    this.router.navigate(['/credits'])
  }
}
