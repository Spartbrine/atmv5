import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./domains/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path:'cards',
    children:
    [
      {
        path: '',
        loadComponent: () => import('./domains/pages/cardmenu/cardmenu.component').then(m => m.CardmenuComponent),
      },
      {
        path:'withdraw',
        loadComponent: () => import ('./domains/pages/cardmenu/pages/withdraw-rep/withdraw-rep.component').then(m => m.WithdrawRepComponent)
      },
      {
        path: 'deposit',
        loadComponent: ()=> import('./domains/pages/cardmenu/pages/deposit/deposit.component').then(m=>m.DepositComponent)
      },
      {
        path:'balance',
        loadComponent:()=> import('./domains/pages/cardmenu/pages/balance/balance.component').then(m=>m.BalanceComponent)
      },
      {
        path:'creditcard',
        loadComponent: () => import('./domains/pages/creditsmenu/pages/credit-card/credit-card.component').then(m => m.CreditCardComponent)
      },
      {
        path:'cardlogin',
        loadComponent: () => import('./domains/shared/pages/cardslogin/cardslogin.component').then(m => m.CardsloginComponent)
      },
      {
        path:'niplogin',
        loadComponent: () => import ('./domains/shared/pages/niplogin/niplogin.component').then(m => m.NiploginComponent)
      },
      {
        path:'changenip',
        loadComponent:()=> import ('./domains/shared/pages/changenip/changenip.component').then(m => m.ChangenipComponent)
      }
    ]
  },

  {
    path:'services', //Este es para cuando ya tenemos a los socios
    children: [ //ASI xd
      {
        path:'',
        loadComponent: () => import('./domains/pages/cardmenu/pages/services/services.component').then(m=>m.ServicesComponent),
      },
      {
        path:'cfe',
        loadComponent:()=>import('./domains/pages/cardmenu/pages/services/pages/cfe/cfe.component').then(m=>m.CfeComponent)
      },
      {
        path:'netflix',
        loadComponent:()=>import('./domains/pages/cardmenu/pages/services/pages/netflix/netflix.component').then(m=>m.NetflixComponent)
      },
      {
        path:'japay',
        loadComponent:()=>import('./domains/pages/cardmenu/pages/services/pages/japay/japay.component').then(m=>m.JapayComponent)
      },
      {
        path:'spotify',
        loadComponent:()=>import('./domains/pages/cardmenu/pages/services/pages/spotify/spotify.component').then(m=>m.SpotifyComponent)
      },
      {
        path:'telmex',
        loadComponent:()=>import('./domains/pages/cardmenu/pages/services/pages/telmex/telmex.component').then(m=>m.TelmexComponent)
      }
    ]
  },
  {
    path:'servicecode', //Para cuando solo quiere pagar sin logearse
    loadComponent: () => import('./domains/shared/pages/servicecode/servicecode.component').then(m => m.ServicecodeComponent)
  },
  {
    path:'cards/credits',
    children:
    [
      {
        path:'',
        loadComponent: () => import('./domains/pages/creditsmenu/creditsmenu.component').then(m => m.CreditsmenuComponent),
      },
      {
        path:'car',
        loadComponent: () => import('./domains/pages/creditsmenu/pages/car-credit/car-credit.component').then(m=>m.CarCreditComponent)
      },
      {
        path:'student',
        loadComponent: () => import('./domains/pages/creditsmenu/pages/studentcredit/studentcredit.component').then(m=>m.StudentcreditComponent)
      },
      {
        path:'mortgage',
        loadComponent: () => import('./domains/pages/creditsmenu/pages/mortgage/mortgage.component').then(m=>m.MortgageComponent)
      }
    ]
  },
  {
    path:'nota',
    loadComponent:()=> import('./domains/shared/components/nota/nota.component').then(m =>m.NotaComponent),
  },
  {
    path:'**',
    loadComponent: ()=> import ('./domains/shared/pages/not-found/not-found.component').then(m=>m.NotFoundComponent)
  }
];
