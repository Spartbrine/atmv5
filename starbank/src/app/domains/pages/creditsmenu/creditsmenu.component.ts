import { Component, inject } from '@angular/core';
import { GeneralCreditsaveService } from '../../shared/services/comunicadores/general-creditsave.service';
import { GeneralCredit } from '../../shared/models/general-credit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditsmenu',
  standalone: true,
  imports: [],
  templateUrl: './creditsmenu.component.html',
  styleUrl: './creditsmenu.component.css'
})
export class CreditsmenuComponent {
  getCredits = inject(GeneralCreditsaveService)
  activeHipotecario = false
  activeAutomovil = false
  activeEstudiantil = false
  router = inject(Router)

  ngOnInit()
  {
    this.getCredits.recuperarCreditos()
    this.creditos()
  }

  creditos()
  {
    const hipotecario = localStorage.getItem("Creditos_credhipotecario");
    const estudiantil = localStorage.getItem("Creditos_credestudiantil");
    const automovil = localStorage.getItem("Creditos_credautomovil");



    console.log("Credito hipotecario", hipotecario)
    console.log("Credito estudiantil", estudiantil)
    console.log("Credito automovil", automovil)
    console.log('aut', automovil?.length)
    console.log('hip',hipotecario?.length)
    console.log('est',estudiantil?.length)


    if(automovil && automovil.length > 0)
    {
      console.log('Existen aut creditos')
      console.log('a', JSON.parse(automovil))
      let autJSON = JSON.parse(automovil)

      if (autJSON.length != 0)
      {
        console.log(autJSON.length)
        console.log('3')
        this.activeAutomovil = true
        console.log(this.activeAutomovil)
      };
    }
    if(estudiantil && estudiantil.length > 0)
    {
      console.log('Existen est creditos')
      console.log('e', JSON.parse(estudiantil))
      let estJSON = JSON.parse(estudiantil)
      if (estJSON.length != 0)
      {
        console.log(estJSON.length)
        console.log('2')
        this.activeEstudiantil = true
        console.log(this.activeEstudiantil)
      };
    }
    if(hipotecario && hipotecario.length > 0)
    {
      console.log('h', JSON.parse(hipotecario))
      console.log('Existen hip creditos')
      console.log(hipotecario.length)
      let hipJSON = JSON.parse(hipotecario)
      if(hipJSON.length != 0)
      {
        console.log(hipJSON.length)
        console.log('1')
        this.activeHipotecario = true
        console.log(this.activeHipotecario)
      };
    }
  }

  pagarMovil()
  {
    this.router.navigate(['/automovil'])
  }

  pagarHipo()
  {
    this.router.navigate(['/hipotecario'])
  }

  pagarEst()
  {
    this.router.navigate(['/estudiantil'])
  }
}
