import puppeteer from "puppeteer";

export const inst = async (id) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=500,800`],
  });

  const page = await browser.newPage();

  // need this to see the mobile view
  await page.setViewport({ width: 500, height: 800 });
  // Navigate the page to a URL
  await page.goto(`https://www.instagram.com/${id}/`);

  await page.waitForNetworkIdle();

  let filteredElements = await page.$$eval("*", (elements) =>
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
    post = filteredElements[0].replace("posts", "").trim();
  }

  filteredElements = await page.$$eval("*", (elements) =>
    elements
      .filter(
        (element) =>
          element.tagName === "LI" &&
          element.innerText &&
          element.innerText.includes("followers")
      )
      .map((element) => element.innerText)
  );
  let followers = "";
  if (filteredElements.length > 0) {
    followers = filteredElements[0].replace("followers", "").trim();
  }

  filteredElements = await page.$$eval("*", (elements) =>
    elements
      .filter(
        (element) =>
          element.tagName === "LI" &&
          element.innerText &&
          element.innerText.includes("following")
      )
      .map((element) => element.innerText)
  );
  let following = "";
  if (filteredElements.length > 0) {
    following = filteredElements[0].replace("following", "").trim();
  }

  const image = await page.$eval("header img", (element) =>
    element.getAttribute("src")
  );

  const title = await page.$eval(
    "header~div div",
    (element) => element.innerText
  );

  const bio = await page.$eval("header~div h1", (element) => element.innerText);

  await browser.close();

  return { id, title, bio, post, followers, following, image };
};
