import { expect } from "chai";

const url = "https://jsonplaceholder.typicode.com/posts/";
const firstPostUrl = url + 1;
const requestBody = {
  userID: 15,
  title: "My first post",
  body: "This is my first post!",
};

describe("json api test", () => {
  it("GET all posts", () => {
    cy.request(url).then((response) => {
      const body = response.body;

      expect(body).to.be.an("array");
      expect(body.length).to.eq(100);
      expect(response.status).to.eq(200);
    });
  });

  it("POST a post", () => {
    cy.request({
      method: "POST",
      url: url,
      body: requestBody,
      headers: {
        "Accept-Language": "en-us",
        "Conent-Type": "application/json",
      },
    }).then((response) => {
      const body = response.body;

      expect(response.status).to.eq(201);
      expect(body).to.include(requestBody);
    });
  });

  it("PUT updates a post", () => {
    const firstPostInitialContent = cy
      .request(firstPostUrl)
      .then((response) => {
        const body = response.body;

        expect(response.status).to.eq(200);
        expect(body).to.be.an("object");
        expect(body).not.to.include(requestBody);
      });

    cy.request({
      method: "PUT",
      url: firstPostUrl,
      body: requestBody,
      headers: {
        "Accept-Language": "en-us",
        "Conent-Type": "application/json",
      },
    }).then((response) => {
      const body = response.body;

      expect(response.status).to.eq(200);
      expect(body).to.include(requestBody);
      expect(body).not.to.include(firstPostInitialContent);
    });
  });

  it("DELETE a post", () => {
    cy.request({
      method: "DELETE",
      url: firstPostUrl,
      headers: {
        "Accept-Language": "en-us",
        "Conent-Type": "application/json",
      },
    }).then((response) => {
      const currentDateUTC = new Date().toUTCString();

      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property("date", currentDateUTC);
    });
  });
});
