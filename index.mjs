import puppeteer from "puppeteer";
import mysql from "mysql";

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

function connectToDatabase() {
  const connection = mysql.createConnection({
    host: "your_host",
    user: "your_username",
    password: "your_password",
    database: "your_database",
  });

  connection.connect();
  return connection;
}

const func = async () => {
  const startTime = new Date();

  function saveRuntimeToDatabase(connection, runtime) {
    connection.query(
      "INSERT INTO runtimes (duration) VALUES (?)",
      [runtime],
      (error, results, fields) => {
        if (error) throw error;
        console.log("Runtime saved:", runtime);
      }
    );

    connection.end();
  }

  //   const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch({
    // executablePath: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    headless: false,
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });

  await page.goto("http://rahkaran.alis.ir/sg");

  await page.type("#txtUsername", "آتنا طهرانی", { delay: 100 });
  await delay(1000);

  await page.type("#txtPassword", "12345678", { delay: 100 });
  await delay(2000);
  console.log("fkkrrrrrrrrrrrrrrrrrkkkkkkkkkkhhh", page);

  //   await page.click("#submit");
  const searchResultSelector = "#submit";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);
  await delay(5000);

  const inputElement = await page.evaluateHandle(() => {
    return document.evaluate(
      "/html/body/form/div[4]/main/div/main/div/nav/div/input",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  });

  await delay(2000);

  await inputElement.click();

  await inputElement.type("گزارش مقایسه", { delay: 100 });

  await page.goto(
    "http://rahkaran.alis.ir/sg3g/x4ee714de/Sales/InvoiceManagement/Reports/SalesComparisonReport.aspx?PageID=1&TimeStamp=1716120896733&PageWidth=1661&PageHeight=567",
    { waitUntil: "networkidle0" }
  );
  await delay(7000);

  await page.click("#cf1");
  await delay(2000);

  await page.click("#dpkFrom_MaskedTextBox");
  await delay(2000);
  await page.type("#dpkFrom_MaskedTextBox", "14020101", { delay: 100 });
  await delay(2000);
  console.log("102");

  await page.click("#dpkTo_MaskedTextBox");
  await delay(2000);
  await page.type("#dpkTo_MaskedTextBox", "14030101", { delay: 100 });
  await delay(2000);
  console.log("108");

  try {
    await page.click("#cf1");
    await delay(2000);

    await page.click("#cmbComparingProviderType");
    await delay(2000);

    console.log("104");

    const ComparingProvider = await page.click(
      "#cmbComparingProviderType_DropDown div ul"
    );

    await page.click("#cmbSegregatingProviderType");
    await delay(2000);

    const SegregatingProvider = await page.click(
      "#cmbSegregatingProviderType_DropDown div ul"
    );
    console.log("lislislislislis lis lislis ", SegregatingProvider);

    await delay(2000);

    // انتخاب گروه محصول
    await page.click(
      "#gridPickerProductGroup_grid_tlbCommand div div div ul li:nth-child(5)"
    );
    await delay(2000);

    await page.waitForSelector(
      "form#form1 > div.RadWindow.RadWindow_Sg.rwNormalWindow.rwTransparentWindow.RadWindow_rtl > table ",
      { visible: true }
    );

    const iframeElementHandle = await page.waitForSelector(
      "html > body > form > div:nth-child(1) > table > tbody > tr.rwContentRow > td.rwWindowContent.rwExternalContent > iframe"
    );

    const frame = await iframeElementHandle.contentFrame();

    console.log("166", frame);

    const elementHandle = await frame.click(
      "table#ctl09 > tbody > tr:nth-child(1) > td:nth-child(2) > div#sltGrouping > table > tbody > tr > td.rcbInputCell.rcbInputCellRight > input"
    );
    console.log("171", elementHandle);

    await frame.type(
      "table#ctl09 > tbody > tr:nth-child(1) > td:nth-child(2) > div#sltGrouping > table > tbody > tr > td.rcbInputCell.rcbInputCellRight > input",
      "عملکرد",
      {
        delay: 100,
      }
    );
    console.log("180");

    await delay(6000);

    await frame.click(
      "form#ctl01 > div:nth-child(1) > div > div.rcbScroll.rcbWidth > ul > li:nth-child(3)"
    );

    await delay(3000);

    await frame.click(
      "table#dlg > tbody > tr:nth-child(2) > td > input[name='btnCreate']"
    );

    console.log("196");

    await delay(4000);

    // انتخاب گروه مشتری
    await page.click(
      "#gridPickerCustomerGroup_grid_tlbCommand div div div ul li:nth-child(5)"
    );
    console.log("204");

    await delay(4000);

    await page.waitForSelector(
      "form#form1 > div.RadWindow.RadWindow_Sg.rwNormalWindow.rwTransparentWindow.RadWindow_rtl > table ",
      { visible: true }
    );
    await delay(4000);

    const secondIframeElementHandle = await page.waitForSelector(
      "html > body > form > div:nth-child(1) > table > tbody > tr.rwContentRow > td.rwWindowContent.rwExternalContent > iframe"
    );

    await delay(4000);

    const secondFrame = await secondIframeElementHandle.contentFrame();

    console.log("166", frame);

    const secondElementHandle = await secondFrame.click(
      "table#ctl09 > tbody > tr:nth-child(1) > td:nth-child(2) > div#sltGrouping > table > tbody > tr > td.rcbInputCell.rcbInputCellRight > input"
    );
    await delay(6000);

    await secondFrame.click(
      "form#ctl01 > div:nth-child(1) > div > div.rcbScroll.rcbWidth > ul > li:nth-child(7)"
    );

    await delay(3000);

    await secondFrame.click(
      "table#dlg > tbody > tr:nth-child(2) > td > input[name='btnCreate']"
    );

    console.log("196");

    await delay(4000);

    // نمایش گزارش
    await page.click("div#toolbar > div > div > div > ul > li");

    page.on("dialog", async (dialog) => {
      console.log(dialog.message()); // Optional: log the alert message to the console
      await dialog.accept(); // This will click the 'OK' button on the alert
    });

    GetResult(page, startTime);

    // const connection = connectToDatabase();
    // saveRuntimeToDatabase(connection, runtime);
    // /html/body/form/div[1]/table/tbody/tr[2]/td[2]/iframe/html/body/form/div[5]/span/div/table/tbody/tr[1]/td/div/fieldset/table/tbody/tr[1]/td[2]/div/table/tbody/tr/td[1]/input
    // await page.click(
    //   "form#form1 > div.RadWindow.RadWindow_Sg.rwNormalWindow.rwTransparentWindow.RadWindow_rtl > table > tbody"
    // );

    // await page.type("گزارش مقایسه", { delay: 100 });

    // cmbSegregatingProviderType
  } catch (error) {
    console.log("catchj errorr rrrrrrrrrrrrrrrr ", error);

    const endTime = new Date();
    const runtime = (endTime - startTime) / 1000;
    // const connection = connectToDatabase();
    // saveRuntimeToDatabase(connection, runtime);
  }
  // /html/body/form/div[5]/span/div[4]/fieldset/div/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/div/table/tbody/tr/td[1]
  // /html/body/form/div[4]/main/div/main/div/div/div/div/div[2]/div/iframe/html/body/
  //   console.log("fkkkkkkkkkkkkkkkkkkkkkkhhh", page);

  //   await page.waitForFunction(
  //     () =>
  //       document.querySelector("#cf1") &&
  //       document.querySelector("#cf1").clientHeight > 0
  //   );

  //   const text = await page.evaluate(() => {

  //     const featureArticle = document.evaluate(
  //       '//*[@id="cf1"]',
  //       document,
  //       null,
  //       XPathResult.FIRST_ORDERED_NODE_TYPE,
  //       null
  //     ).singleNodeValue;

  //     console.log(
  //       "ftghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
  //       featureArticle
  //     );
  //     return featureArticle;
  //   });
  //   await text.click();
  //   await page.goto(
  //     "http://rahkaran.alis.ir/sg3g/x4ee714de/?rnd=8dc78044d547e48&page=ReportViewer.aspx%3FKey%3D2894_1"
  //   );

  //   await delay(5000);
  //   const cf1 = "#cf1";+

  //   await page.waitForSelector("#cf1", { visible: true });
  //   await page.click("document.querySelector("#cf1")");
  await delay(5000);
  //   await page.click("#cf1");
  await delay(200000);

  await browser.close();
};

const GetResult = async (page, startTime) => {
  await delay(10000);
  console.log("289");

  //   const pageElementHandle = await page.waitForSelector(
  //     "main#main_content > div > main > div > div > div > div > div:nth-child(2) > div:nth-child(3) > iframe"
  //     // /html/body/form/div[4]/main/div/main/div/div/div/div/div[2]/div[3]/iframe
  //   );
  //   console.log("295");

  //   await delay(4000);

  //   const GetResultIframe = await GetResultIframeElementHandle.contentFrame();
  console.log("300");

  const endTime = new Date();
  const runtime = (endTime - startTime) / 1000;
  console.log("304");

  const resultTable = await page.waitForSelector(
    "#reportViewer_ReportViewer_fixedTable"
  );
  console.log("309");

  if (resultTable) {
    console.log("if is loaded");

    await page.click(
      "div#reportViewer_ToolBarTop > div > div > div > ul > li:nth-child(13)"
    );

    await page.click(
      "form#form1 > div:nth-child(1) > div > ul > li:nth-child(7)"
    );
  } else {
    console.log("Result table not found.");
  }
};
func();
