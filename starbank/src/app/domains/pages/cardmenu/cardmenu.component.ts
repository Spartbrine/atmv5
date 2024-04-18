import { Component, inject } from '@angular/core';
import { CardsloginComponent } from '../../shared/pages/cardslogin/cardslogin.component';
import { FormsModule } from '@angular/forms';
import { CardsaveService } from '../../shared/services/comunicadores/cardsave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardmenu',
  standalone: true,
  imports: [CardsloginComponent, FormsModule],
  templateUrl: './cardmenu.component.html',
  styleUrl: './cardmenu.component.css'
})
export class CardmenuComponent {
  //Aqui ya se va tener guardada la tarjeta, y en caso de querer pagar servicios, creditos, depositar
  //o cualquier movimiento de los que puede hacer no se debe pedir la tarjeta si el
  //usuario quiere pagar con tarjeta
  router = inject(Router);
  recuTarjetaService = inject(CardsaveService);
  tarjeta = this.recuTarjetaService.recuperarTarjeta();
  ngOnInit()
  {
    this.recuTarjetaService.asignarValoresLS();
  }

  retirarDinero()
  {
    this.router.navigate(['/withdraw']);
  }

}
