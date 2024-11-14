export class Menu {
  plusIconButton = ".itemIcon .anticon-plus";

  open(): void {
    cy.get(this.plusIconButton).click();
  }
}
