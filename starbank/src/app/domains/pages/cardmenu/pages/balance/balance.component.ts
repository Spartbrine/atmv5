import { Component, inject, signal } from '@angular/core';
import { CardsaveService } from '../../../../shared/services/comunicadores/cardsave.service';
import { DebitCardsService } from '../../../../shared/services/solicitudes/debit-cards.service';
import { CreditCardsService } from '../../../../shared/services/solicitudes/credit-cards.service';
import { Card } from '../../../../shared/models/card.model';
import { creditCard } from '../../../../shared/models/creditCard.model';
import { debitCard } from '../../../../shared/models/debitCard.model';
import { CreditCardsaveService } from '../../../../shared/services/comunicadores/credit-cardsave.service';
import { DebitCardsaveService } from '../../../../shared/services/comunicadores/debit-cardsave.service';
import { Router } from '@angular/router';
import { TransactionsService } from '../../../../shared/services/solicitudes/transactions.service';
import { Partner } from '../../../../shared/models/partner.model';
import { Transaction } from '../../../../shared/models/transaction.model';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {

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
  valoresCC = signal<creditCard | null> ( null)
  valoresDC = signal<debitCard | null> (null)


  ngOnInit()
  {
    this.asignarValoresLS();
    this.asignarValores();

  }

  ngAfterViewInit(){
    console.log('Valores de la tarjeta', this.valoresCC(), this.valoresDC());
  }

  asignarValores()
  {
    const tarjeta = this.tarjetaRecu.recuperarTarjeta();
    if(tarjeta)
    {
      if(tarjeta.typeCard == 'DEBITO')
      {
        let valores;
        valores = this.tarSaveDeb.recuValDeb();
        this.valoresDC.set(valores);
      }
      else if(tarjeta.typeCard == 'CREDITO')
      {
        let valores;
        valores = this.tarSaveCred.recuValCred();
        this.valoresCC.set(valores);
      }
    }
  }

  asignarValoresLS()
  {
    const tarjeta = this.tarjetaRecu.recuperarTarjeta();
    if (tarjeta)
    {
      console.log('tarjeta en init', tarjeta);
      if(tarjeta.typeCard == 'DEBITO')
      {
        this.tarjetaDebVal.obtenerTarjeta(tarjeta.card).subscribe(
          {
            next:(valores) =>
            {
              console.log('valores td', this.tarSaveDeb.recuValDeb());
              this.tarSaveDeb.guardarValoresDebito(valores);
            }
          }
        );
      }
      else if(tarjeta.typeCard == 'CREDITO')
      {
        this.tarjetaCredVal.obtenerTarjeta(tarjeta.card).subscribe(
          {
            next:(valores) =>
            {
              console.log('valores tc', this.tarSaveCred.recuValCred());
              this.tarSaveCred.guardarValoresCredito(valores);
            }
          }
        );
      }
    }
  }


  regresar()
  {
    this.postTr('CONSULTA')
    this.router.navigate(['/cards']);
  }

  depositarDebito()
  {
    this.postTr('CONSULTA + DÉPOSITO')
    this.router.navigate(['/deposit']);
  }

  retirarDinero()
  {
    this.postTr('CONSULTA + RETIRO')
    this.router.navigate(['/withdraw']);
  }

  transacciones = inject(TransactionsService)

  postTr(tipo: string)
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
      typeTransaction: tipo,

    }
      console.log('id del usuario', tr)

      this.transacciones.postearTransaccion(tr).subscribe({})
    }

  }

}
