import { Component, inject } from '@angular/core';
import { CardsloginComponent } from '../../shared/pages/cardslogin/cardslogin.component';
import { FormsModule } from '@angular/forms';
import { CardsaveService } from '../../shared/services/comunicadores/cardsave.service';
import { Router, RouterLink } from '@angular/router';
import { TransactionsService } from '../../shared/services/solicitudes/transactions.service';
import { Partner } from '../../shared/models/partner.model';
import { Transaction } from '../../shared/models/transaction.model';

@Component({
  selector: 'app-cardmenu',
  standalone: true,
  imports: [CardsloginComponent, FormsModule, RouterLink],
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
    let tr = localStorage.getItem('transacciones')
    if(tr)
    {
      let trVal = parseInt(JSON.parse(tr))
      if( trVal >= 5 )
      {
        alert('Lo sentimos, no le quedan transacciones')
        this.router.navigate(['/'])
      }
    }
    localStorage.removeItem('retiro')
    localStorage.removeItem('deposito')
  }

  retirarDinero()
  {
    this.router.navigate(['/cards/withdraw']);
  }

  transacciones = inject(TransactionsService)

  verEstadoCuenta()
  {
    this.postTr('VER ESTADO DE CUENTA')
  }

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
