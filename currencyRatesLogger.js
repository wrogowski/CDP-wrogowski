import fetch from "node-fetch";
import dayjs from "dayjs";
import { expect } from "chai";
import fs from "fs";

const currenciesToBeFetched = ["USD", "EUR", "GBP", "CHF"];

async function getCurrencyExchangeRate(currency) {
  const url = `http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`;
  const response = await fetch(url);
  const json = await response.json();

  expect(response.status).to.eq(200);

  return json.rates[0].mid;
}

async function saveData(data) {
  await fs.promises.appendFile("currencies.txt", data);
}

setInterval(async () => {
  saveData(
    `\n\rData fetched on: ${dayjs().locale("pl").format("YYYY/MM/DD hh:mm:ss")}`
  );

  for (const currency of currenciesToBeFetched) {
    const value = await getCurrencyExchangeRate(currency);
    saveData(`\n${currency}: ${value} PLN`);
  }
}, 1000);
