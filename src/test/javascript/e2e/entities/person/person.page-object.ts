import { element, by, ElementFinder } from 'protractor';

export class PersonComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-person div table .btn-danger'));
  title = element.all(by.css('jhi-person div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class PersonUpdatePage {
  pageTitle = element(by.id('jhi-person-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  roomSelect = element(by.id('field_room'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async roomSelectLastOption(): Promise<void> {
    await this.roomSelect.all(by.tagName('option')).last().click();
  }

  async roomSelectOption(option: string): Promise<void> {
    await this.roomSelect.sendKeys(option);
  }

  getRoomSelect(): ElementFinder {
    return this.roomSelect;
  }

  async getRoomSelectedOption(): Promise<string> {
    return await this.roomSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PersonDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-person-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-person'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
