describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5501');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('main :nth-child(1)');
    const url = page.url();
    expect(url).toMatch('http://127.0.0.1:5501/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const heading = await page.$eval("header > h1", (el) => {
      return el.innerHTML;
    });
    expect(heading).toMatch("Entry 1");
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
    implement test5: Clicking on the first journal entry should contain the following contents: 
      { 
        title: 'You like jazz?',
        date: '4/25/2021',
        content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
        image: {
          src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
          alt: 'bee with sunglasses'
        }
      }
    */
      const entry = await page.$('entry-page');
      const property = await (await entry.getProperty('entry')).jsonValue();
      expect(property.title).toMatch("You like jazz?");
      expect(property.date).toMatch('4/25/2021');
      const expectedString = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible."
      expect(property.content).toMatch(expectedString);
      const imgURL = 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455';
      expect(property.image.src).toMatch(imgURL);
      expect(property.image.alt).toMatch("bee with sunglasses");

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const classes = await page.$eval("body", (body) => {
      return body.classList;
    });
    expect(classes[0]).toMatch("single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    const url = page.url();
    expect(url).toMatch('http://127.0.0.1:5501/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const heading = await page.$eval("header > h1", (el) => {
      return el.innerHTML;
    });
    expect(heading).toMatch("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const classes = await page.$eval("body", (body) => {
      return body.classList;
    });
    expect(classes[0]).toMatch("settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const url = page.url();
    expect(url).toMatch('http://127.0.0.1:5501/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should be /', async() => {
    await page.goBack();
    const url = page.url();
    expect(url).toMatch('http://127.0.0.1:5501/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: On Home page - checking page header title', async () => {
    const heading = await page.$eval("header > h1", (el) => {
      return el.innerHTML;
    });
    expect(heading).toMatch("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On Home page - checking <body> has no classes', async () => {
    const classes = await page.$eval("body", (body) => {
      return body.className;
    });
    expect(classes).toMatch("");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    await page.click('main :nth-child(2)');
    const url = page.url();
    expect(url).toMatch('http://127.0.0.1:5501/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: On second Entry page - checking page header title', async () => {
    const heading = await page.$eval("header > h1", (el) => {
      return el.innerHTML;
    });
    expect(heading).toMatch("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On first Entry page - checking <entry-page> contents', async () => {
      const entry = await page.$('entry-page');
      const property = await (await entry.getProperty('entry')).jsonValue();
      expect(property.title).toMatch("Run, Forrest! Run!");
      expect(property.date).toMatch("4/26/2021");
      const expectedString = "Mama always said life was like a box of chocolates. You never know what you're gonna get."
      expect(property.content).toMatch(expectedString);
      const imgURL = "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg";
      expect(property.image.src).toMatch(imgURL);
      expect(property.image.alt).toMatch("forrest running");
  }, 10000);

  // create your own test 17
  it('Test17: Clicking header, new URL should contain "/"', async () => {
    await page.click('header > h1');
    const url = page.url();
    expect(url).toMatch('http://127.0.0.1:5501/');
  });

  // create your own test 18
  it('Test18: Clicking third <journal-entry>, new URL should contain /#entry3', async () => {
    await page.click('main :nth-child(3)');
    const url = page.url();
    expect(url).toMatch('http://127.0.0.1:5501/#entry3');
  });

  // create your own test 19
  it('Test19: On third Entry page - checking page header title', async () => {
    const heading = await page.$eval("header > h1", (el) => {
      return el.innerHTML;
    });
    expect(heading).toMatch("Entry 3");
  });

  // create your own test 20
  it('Test20: On third Entry page - checking <entry-page> contents', async () => {
    const entry = await page.$('entry-page');
    const property = await (await entry.getProperty('entry')).jsonValue();
    expect(property.title).toMatch("Ogres are like onions");
    expect(property.date).toMatch("4/27/2021");
    const expectedString = "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers."
    expect(property.content).toMatch(expectedString);
    const imgURL = "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg";
    expect(property.image.src).toMatch(imgURL);
    expect(property.image.alt).toMatch("shrek and donkey looking confused");
}, 10000);
  
});
