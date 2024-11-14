export class IssueForm {
  issueForm = ".ant-modal";
  statusDropdown = ".btn.uppercase.text-textMedium.text-13";
  statusDropdownList = ".ant-dropdown-menu-item.ng-star-inserted";
  priorityDropdown = ".priority-label";
  priorityDropdownList = ".ant-dropdown-menu-item";
  closeButton = '[icon="times"]';

  checkForm(state: string): void {
    cy.get(this.issueForm, { timeout: 10000 }).should(state);
  }

  changeStatus(status: string): void {
    cy.get(this.statusDropdown).last().click();
    cy.get(this.statusDropdownList).contains(status).click();
  }

  checkStatus(state: string, status: string): void {
    cy.get(this.statusDropdown).last().should(state, status);
  }

  changePriority(priority: string): void {
    cy.get(this.priorityDropdown).click();
    cy.get(this.priorityDropdownList).contains(priority).click();
  }

  checkPriority(state: string, priority: string): void {
    cy.get(this.priorityDropdown).should(state, priority);
  }

  closeIssue(): void {
    cy.get(this.closeButton).click();
  }
}
