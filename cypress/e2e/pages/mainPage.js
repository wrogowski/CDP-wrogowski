import { pagePath } from './cypressCoursePage'

const cdpCourseButton = 'a[role="button"][href$="/cypress"]';

export function openCypressCoursePage() {
  cy.get(cdpCourseButton).last().click();
  cy.location("pathname").should("eq", pagePath);
}
