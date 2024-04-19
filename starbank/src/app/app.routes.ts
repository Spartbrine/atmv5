import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./domains/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path:'cards',
    loadComponent: () => import('./domains/pages/cardmenu/cardmenu.component').then(m => m.CardmenuComponent),
  },
  {
    path:'withdraw',
    loadComponent: () => import ('./domains/pages/cardmenu/pages/withdraw/withdraw.component').then(m => m.WithdrawComponent)
  },
  {
    path:'deposit',
    loadComponent: ()=> import('./domains/pages/cardmenu/pages/deposit/deposit.component').then(m=>m.DepositComponent)
  },
  {
    path:'balance',
    loadComponent:()=> import('./domains/pages/cardmenu/pages/balance/balance.component').then(m=>m.BalanceComponent)
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
  // { asi no
  //   path:'service/1',
  // },
  // {
  //   path:'service/2',
  // },
  // {
  //   path:'service/3',
  // },
  // {
  //   path:'service/4',
  // },
  // {
  //   path:'service/5',
  // },
  {
    path:'withdraw',
    loadComponent: () => import ('./domains/pages/cardmenu/pages/withdraw/withdraw.component').then(m => m.WithdrawComponent)
  },
  {
    path:'credits',
    loadComponent: () => import('./domains/pages/creditsmenu/creditsmenu.component').then(m => m.CreditsmenuComponent),

  },
  {
    path:'automovil',
    loadComponent: () => import('./domains/pages/creditsmenu/pages/car-credit/car-credit.component').then(m=>m.CarCreditComponent)
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
  },
  {
    path:'nota',
    loadComponent:()=> import('./domains/shared/components/nota/nota.component').then(m =>m.NotaComponent),
  },
  {
    path:'creditcard',
    loadComponent: () => import('./domains/pages/creditsmenu/pages/credit-card/credit-card.component').then(m => m.CreditCardComponent)
  },
  {
    path:'**',
    loadComponent: ()=> import ('./domains/shared/pages/not-found/not-found.component').then(m=>m.NotFoundComponent)
  }
];
