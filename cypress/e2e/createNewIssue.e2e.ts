import { kanbanBoardUrl } from "../constants/pageUrls";
import * as breadcrumbs from "../constants/breadcrumbsNames";
import * as statusOptions from "../constants/statusOptions";
import { storyIssueType } from "../constants/issueTypes";
import * as issuePriorities from "../constants/issuePriorities";

import { KanbanBoardPage } from "../pageObjects/kanbanBoardPage";
import { CreateIssueForm } from "../pageObjects/createIssueForm";
import { IssueForm } from "../pageObjects/issueForm";
import { Menu } from "../pageObjects/menu";
import { highestIssuePriorityColor } from "../constants/issuePriorities";

const kanbanBoardPage = new KanbanBoardPage();
const createIssueForm = new CreateIssueForm();
const issueForm = new IssueForm();
const menu = new Menu();

const testcaseSummaryText = "Testcase for Jira Clone";
const testcaseDescriptionText =
  "As an applicant I need to create a testcase for a Jira clone";
const testcaseAssigneeName = "Captain";
const testcaseAssigneeAvatar = "captain_e8s9nk.jpg";

describe("Issue tracker Jira", () => {
  it("Create a new issue in the application", () => {
    cy.visit(kanbanBoardUrl);
    kanbanBoardPage.checkBreadcrumb(
      breadcrumbs.projectsBreadcrumbs,
      breadcrumbs.projectNameBreadcrumbs,
      breadcrumbs.kanbanBoardBreadcrumbs,
      "contain"
    );
    kanbanBoardPage.checkIssueCounter(
      statusOptions.backlogStatusOption,
      "exist",
      "contain",
      3
    );

    menu.open();
    createIssueForm.checkForm("be.visible");

    createIssueForm.selectIssueType(storyIssueType, "not.be.visible");
    createIssueForm.checkIssueType("contain", storyIssueType);

    createIssueForm.selectIssuePriority(
      issuePriorities.highIssuePriority,
      "not.be.visible"
    );
    createIssueForm.checkIssuePriority(
      "contain",
      issuePriorities.highIssuePriority
    );

    createIssueForm.fillSummaryInput(testcaseSummaryText);
    createIssueForm.checkSummaryInput("have.value", testcaseSummaryText);

    createIssueForm.fillDescriptionInput(testcaseDescriptionText);
    createIssueForm.checkDescriptionInput("have.text", testcaseDescriptionText);

    createIssueForm.selectAssignee(testcaseAssigneeName);
    createIssueForm.checkAssignee("contain", testcaseAssigneeName);
    createIssueForm.checkAssigneeIcon(
      testcaseAssigneeName,
      "include",
      testcaseAssigneeAvatar
    );

    createIssueForm.submit();
    createIssueForm.checkForm("not.exist");
    kanbanBoardPage.checkIssueOnBoard(
      statusOptions.backlogStatusOption,
      testcaseSummaryText,
      "exist"
    );
    kanbanBoardPage.checkIssueCounter(
      statusOptions.backlogStatusOption,
      "exist",
      "contain",
      4
    );

    kanbanBoardPage.openIssue(testcaseSummaryText);
    issueForm.checkForm("be.visible");

    issueForm.changeStatus(statusOptions.inProgressStatusOption);
    issueForm.checkStatus("contain", statusOptions.inProgressStatusOption);

    issueForm.changePriority(issuePriorities.highestIssuePriority);
    issueForm.checkPriority("have.text", issuePriorities.highestIssuePriority);

    issueForm.closeIssue();
    issueForm.checkForm("not.exist");
    kanbanBoardPage.checkIssueOnBoard(
      statusOptions.inProgressStatusOption,
      testcaseSummaryText,
      "exist"
    );
    kanbanBoardPage.checkPriorityIcon(
      testcaseSummaryText,
      highestIssuePriorityColor
    );
    kanbanBoardPage.checkIssueCounter(
      statusOptions.backlogStatusOption,
      "exist",
      "contain",
      3
    );
    kanbanBoardPage.checkIssueCounter(
      statusOptions.inProgressStatusOption,
      "exist",
      "contain",
      6 //An error is expected at this point because the actual number of tickets in the column is 5, not 6 as stated in the requirements
    );
  });
});
