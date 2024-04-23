import { Injectable, inject } from '@angular/core';
import { Card } from '../../models/card.model';
import { CreditCardsaveService } from './credit-cardsave.service';
import { DebitCardsaveService } from './debit-cardsave.service';
import { CreditCardsService } from '../solicitudes/credit-cards.service';
import { DebitCardsService } from '../solicitudes/debit-cards.service';
import { HttpClient } from '@angular/common/http';
import { PartnerService } from '../solicitudes/partner.service';
import { PartnersCreditsService } from '../solicitudes/partners-credits.service';
import { GeneralCredit } from '../../models/general-credit.model';
import { PartnersServicesService } from '../solicitudes/partners-services.service';
import { ServicesService } from '../solicitudes/services.service';
import { TransactionsService } from '../solicitudes/transactions.service';
@Injectable({
  providedIn: 'root'
})
export class CardsaveService {
  tarSaveCred = inject(CreditCardsaveService);
  tarSaveDeb = inject(DebitCardsaveService);
  tarjetaCredVal = inject(CreditCardsService);
  tarjetaDebVal = inject(DebitCardsService);
  partnerServDebt = inject(ServicesService)
  trService = inject(TransactionsService)

  private http = inject(HttpClient)
  getPartner = inject(PartnerService)
  getPartnerCredit = inject(PartnersCreditsService)

  guardarTarjetaCompleta(tarjeta: Card) {
    const jsonTarjeta = JSON.stringify(tarjeta);
    localStorage.setItem('tarjeta', jsonTarjeta);
  }

  recuperarTarjeta(): Card | null {

    // Obtener la tarjeta del almacenamiento local
    const jsonTarjeta = localStorage.getItem('tarjeta');
    // Verificar si se encontró una tarjeta en el almacenamiento local
    if (jsonTarjeta) {
        // Convertir la cadena JSON de la tarjeta a un objeto JavaScript
        const tarjetas: Card[] = JSON.parse(jsonTarjeta);
        if (tarjetas.length > 0) {
            // Devolver la primera tarjeta encontrada
            console.log('se encontro la tarjeta en el servicio y es:', tarjetas[0])
            return tarjetas[0];
        } else {
            // Devolver null si no se encontró ninguna tarjeta
            return null;
        }
    } else {
        return null; // Devolver null si no se encontró una tarjeta
    }
  }

  asignarValoresLS()
  {
    //Antes estaba en balance, lo pase a cardsave para reciclar el metodo
    // const tarjeta = this.tarjetaRecu.recuperarTarjeta();
    const tarjeta = this.recuperarTarjeta();
    if (tarjeta)
    {
      //Aqui debo de asignar todos los valores de los datos que se relacionan con el usuario
      console.log('tarjeta en init de cardsave', tarjeta);
      if(tarjeta.typeCard == 'DEBITO')
      {
        this.tarjetaDebVal.obtenerTarjeta(tarjeta.card.toString()).subscribe(
          {
            next:(valores) =>
            {
              console.log('valors', valores)
              console.log('valores td', this.tarSaveDeb.recuValDeb());
              this.tarSaveDeb.guardarValoresDebito(valores);
            }
          }
        );
      }
      else if(tarjeta.typeCard == 'CREDITO')
      {
        this.tarjetaCredVal.obtenerTarjeta(tarjeta.card.toString()).subscribe(
          {
            next:(valores) =>
            {
              console.log('valores', valores)
              console.log('valores tc', this.tarSaveCred.recuValCred());
              this.tarSaveCred.guardarValoresCredito(valores);
            }
          }
        );
      }

      let idU = tarjeta.id_user
      //
      this.getPartner.getSocio(idU).subscribe({
        next:(valor) =>
          {
            console.log('Datos del usuario', valor)
            const jsonValores = JSON.stringify(valor)
            localStorage.setItem('socio', jsonValores)
          }
      })
      //
      this.getPartnerCredit.getCreditDebt(idU).subscribe(
      {
          next:(valor) => {
              console.log('Datos del credito del usuario', valor);
              // Recuperar datos existentes del localStorage
              const jsonCreditos = localStorage.getItem('Creditos');
              let creditosExistente: GeneralCredit[] = [];
              if (jsonCreditos) {
                  creditosExistente = JSON.parse(jsonCreditos);
              }
              // Combina los datos existentes con los nuevos datos
              const nuevosCreditos: GeneralCredit[] = [...creditosExistente, ...valor];
              // Guardar la combinación en el localStorage
              const jsonValores = JSON.stringify(nuevosCreditos);
              localStorage.setItem('Creditos', jsonValores);
          }
      }
      );
      this.partnerServDebt.getServiceDebt(idU).subscribe(
      {
            next:(valor) => {
              let val = JSON.stringify(valor)
              console.log('valores en PALINDROMO', valor)
              localStorage.setItem('servToPay', val)
            }
        }
      );
      this.trService.contarTr(idU).subscribe(
        {
          next:(valor)=>{
            let val = JSON.stringify(valor)
            console.log('Valores en oxiso', valor)
            localStorage.setItem('transacciones', val)
          }
        }
      )

      this.trService.getTrAsc(idU).subscribe({
        next:(valor) => {
          let transacc = JSON.stringify(valor)
          localStorage.setItem('transaccionesASC[]', transacc)
        }
      })

      this.trService.getTrDsc(idU).subscribe({
        next:(valor) => {
          let transacc = JSON.stringify(valor)
          localStorage.setItem('transaccionesDESC[]', transacc)
        }
      })




    }
  }

  getTarjetasRelacionadas(id_user :string)
  {
    const url = 'http://127.0.0.1:5000/tarjetasuser/'
    return this.http.get<Card[]>(url + id_user) //Aqui me quede
  }

}
