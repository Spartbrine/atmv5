import { Component, inject, signal } from '@angular/core';
import { CardsaveService } from '../../../../shared/services/comunicadores/cardsave.service';
import { Card } from '../../../../shared/models/card.model';
import { debitCard } from '../../../../shared/models/debitCard.model';
import { CreditCardsaveService } from '../../../../shared/services/comunicadores/credit-cardsave.service';
import { DebitCardsaveService } from '../../../../shared/services/comunicadores/debit-cardsave.service';
import { creditCard } from '../../../../shared/models/creditCard.model';
import { AsyncPipe } from '@angular/common';
import { DebitCardsService } from '../../../../shared/services/solicitudes/debit-cards.service';
import { CreditCardsService } from '../../../../shared/services/solicitudes/credit-cards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})

export class WithdrawComponent {
  retirar : number = 0;
  alertaDivisor : boolean = false
  permitirTransaccion : boolean = false
  dinero = signal<Number>(0);

  router = inject(Router);

  //Para recuperar los valores de la tarjeta, y dependiendo de
  //Que tipo de tarjeta sea se asigna el servicio de recuperar sus valores
  tarjetaRecu = inject(CardsaveService);
  tarjetaDebVal = inject(DebitCardsService);
  tarjetaCredVal = inject(CreditCardsService);
  //Para guardar y recuperar los valores en el local storage
  tarSaveCred = inject(CreditCardsaveService);
  tarSaveDeb = inject(DebitCardsaveService);


  //Estos son para que vayan cambiando segun se quiera
  valoresDC = signal<debitCard> ({
    card: '',
    balance:'',
    due_date:''
  })

  ngOnInit()
  {
    this.asignarValores();
  }

  ngAfterViewInit(){
    this.asignarValores();
    console.log('Valores de la tarjeta afvi', this.valoresDC());
  }

  asignarValores()
  {
    const tarjeta = this.tarSaveDeb.recuValDeb();
    if(tarjeta)
    {
        let valores;
        valores = this.tarSaveDeb.recuValDeb();
        console.log('valores asignar valores', valores);
        if(valores)
        {
          let tarIn = valores
          this.valoresDC.set(tarIn)
          console.log('tarjeta asignarvalores',this.valoresDC())
        }
    }
  }

  changeDinero(event : Event)
  {
    const input = event.target as HTMLInputElement
    const valornuevo = parseInt(input.value)
    if(valornuevo % 50 == 0)
    {
      this.dinero.set(valornuevo);
      this.permitirTransaccion = true
      this.alertaDivisor = false
    } else {
      this.alertaDivisor = true
    }
  }

  submitRetiro()
  {
    if(this.valoresDC() && this.permitirTransaccion == true)
    {
      let dinro  = this.dinero()
      if(dinro)
      {
        let valor
        valor = parseInt(dinro.toString());
        console.log('saldo disponible', valor)
        if( parseInt(this.dinero().toString()) <= valor)
        {
          let debCD  =
          {
            card : this.valoresDC().card,
            movement_type : "retiro",
            new_balance : this.dinero()
          }
          //Aplicar para que se cambie el saldo y todo eso
          localStorage.setItem('retiro', JSON.stringify(debCD))
          this.retiroGen(debCD)
        }
        else
        {
          alert('Ingrese una cantidad válida');
        }
      }
    }
  }

  retiroGen(actualizacion: object)
  {
    console.log('retiro metodo')
    if(this.tarjetaDebVal.actualizarDebito(actualizacion).subscribe())
    {
      console.log('actualizacion');
      this.router.navigate(['/nota'])

    }
  }

}
