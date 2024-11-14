const columnIndices: {
  [key: string]: number;
} = {
  Backlog: 0,
  "In progress": 2,
};

export class KanbanBoardPage {
  breadcrumbsLine = "breadcrumbs";
  breadcrumbsContent = "breadcrumbs .text-textMedium";
  columnSelector = ".status-list";
  counterSelector = "span";
  issueCardSelector = "issue-card";
  issueSummarySelector = ".issue p";
  priorityIcon = "svg-icon";

  checkBreadcrumb(
    project: string,
    projectName: string,
    tabName: string,
    state: string
  ): void {
    cy.get(this.breadcrumbsContent)
      .should(state, project)
      .and(state, projectName)
      .and(state, tabName);
  }

  checkIssueCounter(
    columnName: string,
    columnState: string,
    counterState: string,
    count: number
  ): void {
    cy.get(this.columnSelector)
      .contains(columnName)
      .should(columnState)
      .within(() => {
        cy.get(this.counterSelector).should(counterState, count);
      });
  }

  checkIssueOnBoard(columnName: string, title: string, state: string): void {
    cy.get(this.columnSelector)
      .eq(columnIndices[columnName])
      .within(() => {
        cy.get(this.issueSummarySelector).contains(title).should(state);
      });
  }

  openIssue(title: string): void {
    cy.get(this.issueCardSelector).contains(title).click();
  }

  checkPriorityIcon(title: string, expectedColor: string): void {
    cy.get(this.issueCardSelector)
      .contains(title)
      .parents(this.issueCardSelector)
      .within(() => {
        cy.get(this.priorityIcon)
          .last()
          .should("have.css", "color", expectedColor);
      });
  }
}
