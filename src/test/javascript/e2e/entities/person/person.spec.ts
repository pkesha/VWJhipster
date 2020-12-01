import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  PersonComponentsPage,
  /* PersonDeleteDialog, */
  PersonUpdatePage,
} from './person.page-object';

const expect = chai.expect;

describe('Person e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personComponentsPage: PersonComponentsPage;
  let personUpdatePage: PersonUpdatePage;
  /* let personDeleteDialog: PersonDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load People', async () => {
    await navBarPage.goToEntity('person');
    personComponentsPage = new PersonComponentsPage();
    await browser.wait(ec.visibilityOf(personComponentsPage.title), 5000);
    expect(await personComponentsPage.getTitle()).to.eq('People');
    await browser.wait(ec.or(ec.visibilityOf(personComponentsPage.entities), ec.visibilityOf(personComponentsPage.noResult)), 1000);
  });

  it('should load create Person page', async () => {
    await personComponentsPage.clickOnCreateButton();
    personUpdatePage = new PersonUpdatePage();
    expect(await personUpdatePage.getPageTitle()).to.eq('Create or edit a Person');
    await personUpdatePage.cancel();
  });

  /* it('should create and save People', async () => {
        const nbButtonsBeforeCreate = await personComponentsPage.countDeleteButtons();

        await personComponentsPage.clickOnCreateButton();

        await promise.all([
            personUpdatePage.setNameInput('name'),
            personUpdatePage.roomSelectLastOption(),
        ]);

        expect(await personUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

        await personUpdatePage.save();
        expect(await personUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Person', async () => {
        const nbButtonsBeforeDelete = await personComponentsPage.countDeleteButtons();
        await personComponentsPage.clickOnLastDeleteButton();

        personDeleteDialog = new PersonDeleteDialog();
        expect(await personDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Person?');
        await personDeleteDialog.clickOnConfirmButton();

        expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
