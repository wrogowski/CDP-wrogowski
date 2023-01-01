import fetch from "node-fetch";
import fs from "fs";
import moment from "moment";
import { expect } from "chai";


// async function getCurrencyExchangeRate() {
//   const response = await fetch('http://api.nbp.pl/api/cenyzlota?format=json');
//   const json = await response.json();
  
//   return json[0].cena
// }
//  const rate = await getCurrencyExchangeRate();
//   console.log(rate.body)
//   console.log(rate.status)
//   console.log(rate.ok)

var url = "http://api.nbp.pl/api/exchangerates/rates/a/eur/";

async function getCurrencyExchangeRate() {
    const response = await fetch(url);
    const json = await response.json();

    expect(response.status).to.eq(200);

    return json.rates[0].mid;
}


let cena = await getCurrencyExchangeRate();
console.log(cena);
