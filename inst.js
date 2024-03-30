import puppeteer from "puppeteer";

export const inst = async (id) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(`https://www.instagram.com/${id}/`);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  //   await page.type(".devsite-search-field", "automate beyond recorder");

  await page.waitForNetworkIdle();

  //   const folowersData = await page.$$eval("._ac2a", (element) =>
  //     element.map((e) => e.textContent)
  //   );
  //   // Print the full title
  //   console.log("Posts:", folowersData[0]);
  //   console.log("Flowers:", folowersData[1]);
  //   console.log("Folowing:", folowersData[2]);

  const filteredElements = await page.$$eval("*", (elements) =>
    elements
      .filter(
        (element) =>
          element.tagName === "LI" &&
          element.innerText &&
          element.innerText.includes("posts")
      )
      .map((element) => element.innerText)
  );
  let post = "";
  if (filteredElements.length > 0) {
    post = filteredElements[0].replace(" posts", "");
  }
  const image = await page.$eval("[alt='Profile photo']", (element) =>
    element.getAttribute("src")
  );

  await browser.close();

  return { post, image };
};
