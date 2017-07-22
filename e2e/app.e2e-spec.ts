import { IwonAppPage } from './app.po';

describe('iwon-app App', () => {
  let page: IwonAppPage;

  beforeEach(() => {
    page = new IwonAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
