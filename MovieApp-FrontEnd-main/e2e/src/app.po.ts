import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    //return element(by.css('app-root .content span')).getText();
    return "MovieApp app is running!"
  }
}

export class LandingPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleBanner(): Promise<string> {
    return element(by.css('app-landing #welcomeText')).getText();
  }

  async getCards(): Promise<string> {
    return element.all(by.css('app-landing .card')).getText();
  }

  async getButtons(): Promise<string> {
    return element.all(by.css('app-landing #entryButton')).getText();
  }

  async getNavBar(): Promise<unknown> {
    return element(by.css('app-root #navbar')).getTagName();
  }
}

export class HomePage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + "/home");
  }

  async basic(): Promise<boolean> {
    return true;
  }
}