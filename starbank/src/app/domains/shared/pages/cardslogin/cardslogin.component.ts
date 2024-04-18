import { Component, Input, OnInit, Output, inject, signal } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardsService } from '../../services/solicitudes/cards.service';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CardsaveService } from '../../services/comunicadores/cardsave.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cardslogin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cardslogin.component.html',
  styleUrls: ['./cardslogin.component.css'],
})

export class CardsloginComponent{
  guardarTarjetaService = inject(CardsaveService);
  cardService = inject(CardsService);
  router = inject(Router);
  tarjetaNoEncontrada : boolean = false;
  mostrarAlerta : boolean = false;
  tarjeta = signal<Card>(
    {
      card:'',
      nip:'',
      id_user:'',
      expire_date:'',
      cvv:'',
      typeCard:''
    }
  )

  submitLogin() {
    this.verificarTarjeta().subscribe(validacion => {
      console.log(validacion);
      console.log('tarjeta', this.tarjeta().card);
      if (validacion == true) {
        this.tarjetaNoEncontrada = false;
        this.router.navigate(['/niplogin']);
      } else if (validacion == false) {
        this.tarjetaNoEncontrada = true;
      }
    });
  }

  verificarTarjeta(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.cardService.getOneCard(this.tarjeta().card).subscribe({
        next: (valor) => {
          console.log('tarjeta', this.tarjeta().card);
          console.log(valor);
          if (valor && Object.keys(valor).length > 0)
          {
            console.log('Tarjeta encontrada.', valor);
            observer.next(true);
            this.tarjeta.set(valor);
            this.guardarTarjetaService.guardarTarjetaCompleta(this.tarjeta());
          }
          else
          {
            console.log('Tarjeta no encontrada.');
            observer.next(false); //hace que el observador que es de tipo booleano sea falso
          }
          console.log(this.tarjeta(), 'tarjeta desde fuera del metodo de asignacion')

          observer.complete(); //para completar la observacion
        },
        error: (error) => {
          console.error('Error al verificar tarjeta:', error);
          observer.error(error);
        }
      });
    });
  }

  changeCard(event: Event)
  {
    const input = event.target as HTMLInputElement;
    const valorNuevo = input.value;
    this.tarjeta.update(prevState =>
      {
        return {
          ...prevState,
          card:(valorNuevo)
        }
      });
  }



}
