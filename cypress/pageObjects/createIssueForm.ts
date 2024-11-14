export class CreateIssueForm {
  addIssueForm = "add-issue-modal";
  issueTypeDropdown = "issue-type-select";
  issueDropdownList = ".ant-select-dropdown";
  priorityModalBody = ".ant-modal-body";
  priorityFormGroup = ".form-group";
  priorityLabelText = "Issue priority";
  prioritySelect = "nz-select";
  selectedIssue = ".ml-3.font-semibold.uppercase.text-textMedium.text-13";
  summaryInput = 'input[formcontrolname="title"]';
  descriptionInput = ".ql-editor";
  selectAssigneeTopControl = "nz-select-top-control";
  optionAssigneeItem = 'nz-option-item[title="Captain"]';
  selectionAssigneeItem = ".ant-select-selection-item";
  avatarAssigneeContainer = "j-avatar .avatar-container";
  createIssueButton = 'button:contains("Create Issue")';

  checkForm(state: string): void {
    cy.get(this.addIssueForm, { timeout: 10000 }).should(state);
  }

  selectIssueType(issueType: string, state: string): void {
    cy.get(this.issueTypeDropdown).first().click();
    cy.get(this.issueDropdownList)
      .contains(issueType)
      .click()
      .blur({ force: true });
    cy.get(this.issueDropdownList).should(state);
  }

  checkIssueType(state: string, issueType: string): void {
    cy.get(this.selectedIssue).first().should(state, issueType);
  }

  selectIssuePriority(issuePriority: string, state: string): void {
    cy.get(
      `${this.priorityModalBody} ${this.priorityFormGroup}:contains("${this.priorityLabelText}") ${this.prioritySelect}`
    ).click();
    cy.get(this.issueDropdownList)
      .contains(issuePriority)
      .click()
      .blur({ force: true });
    cy.get(this.issueDropdownList).should(state);
  }

  checkIssuePriority(state: string, issuePriority: string): void {
    cy.get(this.selectedIssue).last().should(state, issuePriority);
  }

  fillSummaryInput(summaryValue: string): void {
    cy.get(this.summaryInput).type(summaryValue);
  }

  checkSummaryInput(state: string, summaryValue: string): void {
    cy.get(this.summaryInput).should(state, summaryValue);
  }

  fillDescriptionInput(descriptionValue: string): void {
    cy.get(this.descriptionInput).type(descriptionValue);
  }

  checkDescriptionInput(state: string, descriptionValue: string): void {
    cy.get(this.descriptionInput).should(state, descriptionValue);
  }

  selectAssignee(assigneeName: string): void {
    cy.get(this.selectAssigneeTopControl).last().click();
    cy.get(this.optionAssigneeItem).contains(assigneeName).click();
  }

  checkAssignee(state: string, assigneeName: string): void {
    cy.get(this.selectAssigneeTopControl)
      .find(this.selectionAssigneeItem)
      .should(state, assigneeName);
  }

  checkAssigneeIcon(
    assigneeName: string,
    state: string,
    assigneeAvatar: string
  ): void {
    cy.get(
      `${this.selectAssigneeTopControl} ${this.selectionAssigneeItem}:contains("${assigneeName}") ${this.avatarAssigneeContainer}`
    )
      .invoke("css", "background-image")
      .should(state, assigneeAvatar);
  }

  submit(): void {
    cy.get(this.createIssueButton).click();
  }
}
