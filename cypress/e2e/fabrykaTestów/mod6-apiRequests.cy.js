import { expect } from "chai";

const url = "https://jsonplaceholder.typicode.com/";

describe("json api test", () => {
  const postsUrl = `${url}posts`;

  it("GET all posts", () => {
    cy.request(postsUrl).then((response) => {
      const body = response.body;
      expect(body).to.be.an("array");
      expect(body.length).to.eq(100);
      expect(response.status).to.eq(200);
    });
  });

  it("POST a post", () => {
    const requestBody = {
      userID: 15,
      title: "My first post",
      body: "some post body",
    };

    cy.request({
      method: "POST",
      url: postsUrl,
      body: requestBody,
      headers: {
        "Accept-Language": "en-us",
        "Conent-Type": "application/json",
      },
    }).then((response) => {
      const body = response.body;

      expect(response.status).to.eq(201);

      const requestBody = {
        userID: 15,
        body: "some postp body",
      };
      expect(body).to.include(requestBody);
    });
  });
});
