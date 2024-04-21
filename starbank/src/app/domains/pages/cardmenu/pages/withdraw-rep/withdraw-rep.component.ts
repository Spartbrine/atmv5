import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardsaveService } from '../../../../shared/services/comunicadores/cardsave.service';
import { DebitCardsService } from '../../../../shared/services/solicitudes/debit-cards.service';
import { CreditCardsService } from '../../../../shared/services/solicitudes/credit-cards.service';
import { CreditCardsaveService } from '../../../../shared/services/comunicadores/credit-cardsave.service';
import { DebitCardsaveService } from '../../../../shared/services/comunicadores/debit-cardsave.service';
import { debitCard } from '../../../../shared/models/debitCard.model';

@Component({
  selector: 'app-withdraw-rep',
  standalone: true,
  imports: [],
  templateUrl: './withdraw-rep.component.html',
  styleUrl: './withdraw-rep.component.css'
})
export class WithdrawRepComponent {
  dineroDp : number  = 0;
  dinero = signal('')
  alertaDivisor : boolean = false
  permitirTransaccion : boolean = false
  router = inject(Router)
  tarRec = inject(CardsaveService)
  tarDebVal = inject(DebitCardsService)
  tarCredVal = inject(CreditCardsService)
  tarCredSave = inject(CreditCardsaveService)
  tarDebSave = inject(DebitCardsaveService)
  card = this.tarDebSave.recuValDeb()?.card;
  saldo = this.tarDebSave.recuValDeb()?.balance

  ngOnInit()
  {
    let dineroRep = localStorage.getItem('dineroDp')
    if(dineroRep)
    {
      this.dineroDp = parseInt(dineroRep)
      console.log('dinero disponible', this.dineroDp)
    }
  }
  changeDinero(event : Event)
  {
    const input = event.target as HTMLInputElement
    const valornuevo = parseInt(input.value)
    if (this.saldo)
    {
      if(valornuevo >= 9000)
        {
          alert('No puede retirar más de 9000$')
          this.dinero.set('')
        }
        if(valornuevo % 50 == 0 && valornuevo<= 9000 && valornuevo <= this.dineroDp && valornuevo <= parseInt(this.saldo) ) //Para verificar que sea menor a 9000 y no se pase del dinero disponible
        {
          console.log('dinero en change', this.dinero())
          this.dinero.set(valornuevo.toString());
          this.permitirTransaccion = true
          this.alertaDivisor = false
        }
        else if (valornuevo > this.dineroDp) {
          alert('Cantidad de efectivo no disponible')
        }
        else {
          this.alertaDivisor = true
        }
    }
  }

  submitRetiro()
  {
    if(this.permitirTransaccion)
    {
      let dinro  = this.dinero().toString()
      if(dinro)
      {
        let valor
        valor = parseInt(dinro.toString());
        console.log('saldo disponible', valor)
        if( parseInt(this.dinero().toString()) <= valor)
        {
          let debCD  =
          {
            card : this.card,
            new_balance : parseInt(dinro),
            movement_type : "retiro"
          }
          let nuevoDineroBanco = this.dineroDp - parseInt(dinro)
          console.log('dinero nuevo en el banco:', nuevoDineroBanco)
          localStorage.setItem('dineroDp', nuevoDineroBanco.toString())
          console.log('Tarjeta a guardar', this.card)
          //Aplicar para que se cambie el saldo y todo eso
          localStorage.setItem('retiro', JSON.stringify(debCD))
          this.reti(debCD)
        }
        else
        {
          alert('Ingrese una cantidad válida');
        }
      }
    }
  }

  reti(actualizacion: object)
  {
    console.log('retiro metodo')
    if(this.tarDebVal.actualizarDebito(actualizacion).subscribe())
    {
      console.log('actualizacion');
      this.router.navigate(['/nota'])

    }
  }


}
