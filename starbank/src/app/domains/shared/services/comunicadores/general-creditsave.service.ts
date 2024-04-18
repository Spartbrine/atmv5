import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GeneralCredit } from '../../models/general-credit.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralCreditsaveService {

  recuperarCreditos()
  {
    const jsonCredit  = localStorage.getItem('Creditos');
    if (jsonCredit)
    {
      console.log("Existen creditos", jsonCredit)
      const creditos : GeneralCredit[] = JSON.parse(jsonCredit)
      if (creditos) {
        // Filtrar créditos por tipo
        const creditosHipotecarios = creditos.filter(credito => credito.typeCredit == "Hipotecario");
        const creditosEstudiantiles = creditos.filter(credito => credito.typeCredit == "Estudiantil");
        const creditosAutomovil = creditos.filter(credito => credito.typeCredit == "Carro");

        // Guardar créditos filtrados en el localStorage
        this.guardarCreditosTipo("credhipotecario", creditosHipotecarios);
        this.guardarCreditosTipo("credestudiantil", creditosEstudiantiles);
        this.guardarCreditosTipo("credautomovil", creditosAutomovil);
      }
    }

  }

  guardarCreditosTipo(tipo: string, creditos: GeneralCredit[])
  {
    localStorage.setItem(`Creditos_${tipo}`, JSON.stringify(creditos));
  }

}
