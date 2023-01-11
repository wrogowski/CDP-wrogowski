export const pagePath = "/cypress/";
const instructorPanel = "section";

export function scrollToInstructorName() {
  cy.get(instructorPanel)
    .contains("Kto nauczy CIę testów automatycznych?")
    .scrollTo("center", { ensureScrollable: false });
}

export function takeInstructorPanelScreenshot() {
  cy.get(instructorPanel)
    .contains("Kto nauczy CIę testów automatycznych?")
    .parentsUntil("section")
    .last()
    .screenshot("screenshot", { capture: "viewport" });
}
