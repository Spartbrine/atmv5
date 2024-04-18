import { Component, inject, signal } from '@angular/core';
import { CardsaveService } from '../../services/comunicadores/cardsave.service';
import { Card } from '../../models/card.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-niplogin',
  standalone: true,
  imports: [],
  templateUrl: './niplogin.component.html',
  styleUrl: './niplogin.component.css'
})
export class NiploginComponent {

  guardarTarjetaService = inject(CardsaveService);
  router = inject(Router);
  nipNoEncontrado : boolean = false;
  //El signal es una variable no primitiva por asi decirlo
  public nip = signal('');
  nipGuar : string  | undefined = '';


  ngOnInit() {
    const tarjeta = this.guardarTarjetaService.recuperarTarjeta();
    if(tarjeta)
    {
      console.log('tarjeta en init', tarjeta);
      this.nipGuar = tarjeta.nip;
    }
  }



  changeNip(event: Event) {
    console.log('Cambio en el campo de NIP. Actualizando valor del NIP.');
    const input = event.target as HTMLInputElement;
    const valorNuevo = input.value;
    this.nip.set(valorNuevo);
    console.log('Nuevo valor de NIP:', this.nip());
    this.submitNIP()
  }

  submitNIP() {
    let validarNIP = this.verificarNIP();
    console.log('nip:', this.nipGuar);
    console.log('validacion', validarNIP);
    if (validarNIP == true) {
      const tarjeta = this.guardarTarjetaService.recuperarTarjeta();
      console.log('NIP validado correctamente. Navegando a la ruta /cards.');
      if(tarjeta)
      {
        this.guardarTarjetaService.getTarjetasRelacionadas(tarjeta.id_user).subscribe(
          {
            next:(valor)=>
              {
                console.log('Tarjetas relacionadas:', valor)
              }
          }
        )
      }
      this.router.navigate(['/cards']);
    } else {
      console.log('NIP no válido. Mostrando mensaje de error.');
      this.nipNoEncontrado = true;
    }
  }

  verificarNIP(): boolean {
    console.log('Verificar NIP');
    const tarjetaGuardada: Card | null = this.guardarTarjetaService.recuperarTarjeta();
    console.log('tarjeta en verificar nip guarda', tarjetaGuardada);

    if (tarjetaGuardada &&  this.nip().toString() ==tarjetaGuardada.nip) {
        this.nipGuar = tarjetaGuardada.nip;
        console.log('nip guar en el if', this.nipGuar);
        console.log('nip guardado desde la verificacion', this.nipGuar);
        console.log('nip en verificar', this.nipGuar);

            console.log('nip a verificar', this.nip());
            console.log('nip confirmado', this.nipGuar);
            return true;
    }else{
      console.log('nip incorrecto');
      return false;
    }

  }
}
