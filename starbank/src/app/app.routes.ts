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
    loadComponent: () => import('./domains/pages/cardmenu/pages/services/services.component').then(m=>m.ServicesComponent)
  },
  {
    path:'servicecode', //Para cuando solo quiere pagar sin logearse
    loadComponent: () => import('./domains/shared/pages/servicecode/servicecode.component').then(m => m.ServicecodeComponent)
  },
  {
    path:'service/1',
    loadComponent: () => import ('./domains/pages/payservices/pages/netflix/netflix.component').then(m=>m.NetflixComponent),
  },
  {
    path:'service/2',
    loadComponent: () => import ('./domains/pages/payservices/pages/spotify/spotify.component').then(m=>m.SpotifyComponent),
  },
  {
    path:'service/3',
    loadComponent: () => import ('./domains/pages/payservices/pages/japay/japay.component').then(m=>m.JapayComponent),
  },
  {
    path:'service/4',
    loadComponent: () => import ('./domains/pages/payservices/pages/cfe/cfe.component').then(m=>m.CfeComponent),
  },
  {
    path:'service/5',
    loadComponent: () => import ('./domains/pages/payservices/pages/telmex/telmex.component').then(m=>m.TelmexComponent),
  },
  {
    path:'withdraw',
    loadComponent: () => import ('./domains/pages/cardmenu/pages/withdraw/withdraw.component').then(m => m.WithdrawComponent)
  },
  {
    path:'credits',
    loadComponent: () => import('./domains/pages/creditsmenu/creditsmenu.component').then(m => m.CreditsmenuComponent),

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
    loadComponent:()=> import('./domains/shared/components/nota/nota.component').then(m =>m.NotaComponent)
  },
  {
    path:'creditcard',
    loadComponent: () => import('./domains/pages/creditsmenu/pages/creditcard/creditcard.component').then(m => m.CreditcardComponent)
  },
  {
    path:'**',
    loadComponent: ()=> import ('./domains/shared/pages/not-found/not-found.component').then(m=>m.NotFoundComponent)
  }
];
