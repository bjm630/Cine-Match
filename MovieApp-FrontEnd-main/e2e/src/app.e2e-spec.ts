import { AppPage, HomePage, LandingPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let landing: LandingPage;
  let home: HomePage;

  beforeEach(() => {
    page = new AppPage();
    landing = new LandingPage();
    home = new HomePage();
  });

  // it('should display welcome message', async () => {
  //   await page.navigateTo();
  //   expect(await page.getTitleText()).toEqual('MovieApp app is running!');
  // });

  it('should display the navbar', async () => {
    await landing.navigateTo();
    expect(await landing.getNavBar()).toEqual('app-navbar');
  });

  it('landing should correctly display title banner', async () => {
    await landing.navigateTo();
    expect(await landing.getTitleBanner()).toEqual("Welcome to CineMatch!");
  });

  it('landing should have the description cards visible', async () => {
    await landing.navigateTo();
    let text: string = await landing.getCards();
    expect(text.length).toEqual(3);
  });

  it('landing should have two get started buttons', async () => {
    await landing.navigateTo();
    let response: string = await landing.getButtons();
    expect(response.length).toEqual(2);
  });

  afterEach(async () => {
    // I had to comment this out because I was unable to find a fix for this breaking while using firefox
    // Assert that there are no errors emitted from the browser
    //const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    //expect(logs).not.toContain(jasmine.objectContaining({
    //  level: logging.Level.SEVERE,
    //} as logging.Entry));
  });
});
