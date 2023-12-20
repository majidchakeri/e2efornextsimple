import puppeteer from "puppeteer";

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto("http://localhost:3000/");

	await page.setViewport({ width: 1080, height: 1024 });
	await delay(2000);

	await page.click("div a");
	await delay(2000);

	await page.type("div#__next div input", "0");
	await delay(1000);
	await page.type("div input:nth-child(2)", "1");
	await delay(1000);
	await page.type("div input:nth-child(3)", "2");
	await delay(1000);
	await page.type("div input:nth-child(4)", "3");

	await delay(2000);

	await page.click("div#__next button");

	await delay(2000);

	const selectors = await page.$x("/html/body/div[1]/button[2]");
	console.log("selector is ==== ", selectors);
	await delay(2000);
	await selectors[0].click();

	await delay(3000);

	await page.goBack();

	await delay(4000);

	console.log("Test for verification rout is END...");
	await browser.close();
})();
