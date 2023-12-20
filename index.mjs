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

	await page.setViewport({ width: 1366, height: 768 });
	await delay(2000);

	console.log("Test for verification rout is started...");

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
	await delay(2000);
	await selectors[0].click();

	await delay(3000);

	await page.goBack();

	await delay(4000);

	console.log("Test for verification rout is END...");

	UsersTest(page, browser);
})();

async function UsersTest(page, browser) {
	console.log("Test for users rout is started...");

	const usersRout = await page.$x("/html/body/div[1]/div/a[2]");
	await delay(2000);
	await usersRout[0].click();

	await delay(2000);

	await page.keyboard.down("Control");
	await page.keyboard.down("Shift");
	await page.keyboard.press("F2");
	await page.keyboard.up("Shift");
	await page.keyboard.up("Control");

	await page.waitForTimeout(2000);

	await page.keyboard.down("Control");
	await page.keyboard.down("Shift");
	await page.keyboard.press("F3");
	await page.keyboard.up("Shift");
	await page.keyboard.up("Control");

	await delay(2000);
	await page.keyboard.type("It's test for type and showing dialog box value");
	await delay(4000);

	await page.keyboard.press("Escape");

	await page.waitForTimeout(2000);

	console.log("Test for users rout is END...");

	await page.waitForTimeout(2000);

	await page.goBack();

	await page.waitForTimeout(2000);

	await browser.close();
}
