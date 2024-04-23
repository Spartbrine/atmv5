export interface MoviDeb
{
  card : string;
  new_balance: string;
  movement_type: string;
  debt?: string
}

export interface MoviCred
{
  card:string,
  creditAvailable:number
}
