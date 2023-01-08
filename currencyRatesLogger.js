import fetch from "node-fetch";
import dayjs from "dayjs";
import { expect } from "chai";
import fs from "fs";

const currenciesToBeFetched = ["USD", "EUR", "GBP", "CHF", "WTF"];

async function getCurrencyExchangeRate(currency) {
  const url = `http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`;
  const response = await fetch(url);

  try {
    expect(response.status).to.eq(
      200,
      `Wrong response status code for ${currency}`
    );
  } catch (apiException) {
    saveData(`\nUnable to fetch data from the external API. ${apiException}`);
    return null
  }

  try {
    //wanted to enforce JSON parsing error occur
    const json = currency === "GBP" ? "test" : await response.json();
    return json.rates[0].mid;
  } catch (parsingException) {
    saveData(
      `\nExternal API data parsing error for ${currency}. ${parsingException}`
    );
  }
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
    if (value) saveData(`\n${currency}: ${value} PLN`);
  }
}, 1000);
