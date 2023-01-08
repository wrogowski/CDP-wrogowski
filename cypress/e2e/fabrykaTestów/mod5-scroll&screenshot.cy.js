import { openCypressCoursePage } from "../pages/mainPage";
import {
  scrollToInstructorName,
  takeInstructorPanelScreenshot,
} from "../pages/cypressCoursePage";

describe("go to the course page, scroll down and make a screenshot", () => {
  beforeEach("open the main page", () => {
    cy.visit("https://fabrykatestow.pl/");
  });

  it("should make a screenshot on the course page", () => {
    openCypressCoursePage();
    scrollToInstructorName();
    takeInstructorPanelScreenshot();
  });
});
