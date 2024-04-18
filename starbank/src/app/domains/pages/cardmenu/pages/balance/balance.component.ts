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


  pagarCredito()
  {
    this.router.navigate(['/creditcard']);
  }

  depositarDebito()
  {
    this.router.navigate(['/deposit']);
  }

  retirarDinero()
  {
    this.router.navigate(['/withdraw']);
  }

}
