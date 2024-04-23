export interface MoviDeb
{
  card : string;
  new_balance: string;
  movement_type: string;
  debt?: string;
  abono?: string;
  creditoFaltante?:string;
}

export interface MoviCred
{
  card:string,
  creditAvailable:number
}
