// src/app/api/cambio/route.js
import puppeteer from 'puppeteer';

export async function GET() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.surland.com');
    
    // Asegúrate de que el selector apunte al lugar correcto
    const exchangeRate = await page.$eval('div.change-currency-container b', el => el.innerText);

    await browser.close();

    if (!exchangeRate) {
      return new Response(JSON.stringify({ error: 'No se pudo encontrar el tipo de cambio' }), { status: 404 });
    }

    return new Response(JSON.stringify({ exchangeRate }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al obtener el tipo de cambio' }), { status: 500 });
  }
}
