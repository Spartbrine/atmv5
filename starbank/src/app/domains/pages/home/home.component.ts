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
    localStorage.clear();
  }
  ngOnChanges()
  {
    console.log('Estas en home');
  }
  clickRoute(path: string) {
    this.router.navigate([path]);
}
}
