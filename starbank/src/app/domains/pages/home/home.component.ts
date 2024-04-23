import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { CardsaveService } from '../../shared/services/comunicadores/cardsave.service';
import { Card } from '../../shared/models/card.model';
import { DebitCardsaveService } from '../../shared/services/comunicadores/debit-cardsave.service';
import { CreditCardsaveService } from '../../shared/services/comunicadores/credit-cardsave.service';
import { debitCard } from '../../shared/models/debitCard.model';
import { creditCard } from '../../shared/models/creditCard.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLink, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  router = inject(Router);

  ngOnInit()
  {
    console.log('Estas en home');
    localStorage.removeItem('Creditos')
    localStorage.removeItem('servToPay')
    localStorage.removeItem('socio')
    localStorage.removeItem('tarjeta')
    localStorage.removeItem('transacciones')
    localStorage.removeItem('valdeb')
    localStorage.removeItem('valcred')
    localStorage.removeItem('Creditos_credautomovil')
    localStorage.removeItem('Creditos_credestudiantil')
    localStorage.removeItem('Creditos_credhipotecario')
    localStorage.removeItem('deposito')
    localStorage.removeItem('retiro')
    localStorage.removeItem('transacciones[]')
    localStorage.removeItem('transaccionesASC[]')
    localStorage.removeItem('transaccionesDESC[]')

    let ComprobacionDinero = localStorage.getItem('dineroDp')
    if(ComprobacionDinero) //Esto es para que sea "funcional" en el sentido de que si se hacen retiros se va descontando del localstorage
    {                      //el dinero que se va retirando, para "meter dinero", como ya se tiene dinero (en este momento 60000)
      console.log('dinero en el banco:', ComprobacionDinero)
    }                       //pues no se va a agregar los 8000 al localstorage
    else{
      localStorage.setItem('dineroDp', '8000')

    }
  }
  ngOnChanges()
  {
    console.log('Estas en home');
    localStorage.clear()
  }
  ngAfterView()
  {
    localStorage.clear()
  }
  clickRoute(path: string) {
    this.router.navigate([path]);
}
}
