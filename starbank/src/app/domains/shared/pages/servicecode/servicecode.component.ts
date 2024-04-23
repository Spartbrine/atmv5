import { Component, inject, signal } from '@angular/core';
import { ServicesService } from '../../services/solicitudes/services.service';
import { PartnersServicesService } from '../../services/solicitudes/partners-services.service';
import { ServiceDebt } from '../../models/service-debt.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-servicecode',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './servicecode.component.html',
  styleUrl: './servicecode.component.css'
})
export class ServicecodeComponent {
  srvCode : boolean = false
  servicePartServ = inject(PartnersServicesService)
  codigo = signal('')
  router = inject(Router)

  changeCode(event : Event)
  {
    const input = event.target as HTMLInputElement
    const newValue = input.value
    this.codigo.set(newValue)
  }

  submitCode()
  {
    this.getCode()
    let servJSONstring = localStorage.getItem('servicio')
    if(servJSONstring)
    {
      let servicioAsign : ServiceDebt[] = JSON.parse(servJSONstring)
      if(servicioAsign[0].debt <= 0)
      {
        alert('La deuda ya esta pagada')
      }
      else
      {
        console.log('servicio asignado en el metodo', servicioAsign[0].service_code)
      let verificacion = this.verifyCode(servicioAsign)
      console.log('verificacion', verificacion)
      if(servicioAsign[0].name)
      {
        if(verificacion == true)
          {
            this.router.navigate([`servicecode/${servicioAsign[0].name.toLowerCase()}`])
          }
      }
      }
    }
  }

   getCode()
  {

    this.servicePartServ.getOneDebtUSr(this.codigo()).subscribe({
      next:(valor) =>{
        console.log(valor)
        let JSONvalor = JSON.stringify(valor)
        console.log('servicio encontrado en getCode', valor)
        localStorage.setItem('servicio',JSONvalor)
      }
    })
  }
  verifyCode(servicio : ServiceDebt[])
  {
    if(this.codigo() == servicio[0].service_code)
    {
      return true
    }
    else
    {
      return false
    }
  }

}
