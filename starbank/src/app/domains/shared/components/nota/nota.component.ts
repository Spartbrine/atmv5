import { Component, inject } from '@angular/core';
import { MoviDeb } from '../../models/Movimiento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent {
  movimiento : string = ''
  mov : MoviDeb | null = null;
  tiempoRestante : number = 60;
  router = inject(Router)
  ngOnInit()
  {
    const intervalo = setInterval(()=> {
      this.tiempoRestante--;
      if(this.tiempoRestante <= 0)
      {
        clearInterval(intervalo);
        this.redireccionar();
      }
    }, 1000);
    this.recuMov()
    console.log(this.recuMov())

  }

  redireccionar()
  {
    this.router.navigate(['/cards'])
  }

  ngAfterViewInit()
  {
    this.mov = this.recuMov();
  }

  recuMov() : MoviDeb | null
  {
    const jsonRetiro = localStorage.getItem('retiro')

    const jsonDeposito = localStorage.getItem('deposito')
    if(jsonDeposito)
    {
      this.movimiento = 'Déposito'
      const movi  = JSON.parse(jsonDeposito);
      console.log('movi general',movi)
      return movi;
    }
    else if(jsonRetiro)
    {
      this.movimiento = 'Retiro'
      const movi = JSON.parse(jsonRetiro)
      console.log('movi general', movi)
      return movi
    }
    else {
      console.log('nulo 1')
      return null; // Devolver null si no se encontró una tarjeta
    }
  }

}
