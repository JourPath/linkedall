beforeEach(() => {});

describe("Sign Up: Home Page > Get Started Auth Flow", () => {
  describe("Email", () => {
    it("should sign up, confirm, log in, and redirect to profile", () => {
      cy.visit("/");
      // input subdomain email *@reply.linkedall.online
      cy.get("input[type=email]").type("test1@reply.linkedall.online");
      cy.get("input[type=password]").type("TestPassword123!");
      cy.get("button[type=submit]").click();
      // get confirm code
      // input confirm code
      // cy.get("input[class=vi]").type("12345");
      // redirect to profile
      // cy.url().should("eq", "http://localhost:3000/profile");
      // cookie shoud be present
      // cy.getCookie("sb:token").should("exist");
    });
  });

  describe("LinkedIn", () => {
    it.only("should redirect to linkedin log in, sign in, and redirect to profile", () => {});
  });
});

describe("Sign Up: Sign Up Page Auth Flow", () => {
  describe("Email", () => {
    it("should sign up, confirm, log in, and redirect to profile", () => {});
  });

  describe("LinkedIn", () => {
    it("should redirect to linkedin log in, sign in, and redirect to profile", () => {});
  });
});

describe("Sign Up: Pricing > Basic Auth Flow", () => {
  describe("Email", () => {
    it("should redirect to sign up page, confirm, log in, and redirect to profile", () => {});
  });

  describe("LinkedIn", () => {
    it("should redirect to linkedin log in, sign in, and redirect to profile", () => {});
  });
});

describe("Sign Up: Pricing > Pro Auth Flow", () => {
  describe("Email", () => {
    it("should redirect to sign up page with pro plan, confirm, log in, redirect to stripe with pro plan, pay, and redirect to profile", () => {});
  });

  describe("LinkedIn", () => {
    it("should redirect to linkedin log in, sign in, redirect to stripe with pro plan, pay, and redirect to profile", () => {});
  });
});

describe("Sign Up: Pricing > Business Auth Flow", () => {
  describe("Email", () => {
    it("should redirect to sign up page with business plan, confirm, log in, redirect to stripe with business plan, pay, and redirect to profile", () => {});
  });

  describe("LinkedIn", () => {
    it("should redirect to linkedin log in, sign in, redirect to stripe with business plan, pay, and redirect to profile", () => {});
  });
});

describe("Sign Up: From Shareable Link > Sign Up Page Auth Flow", () => {
  describe("Email", () => {
    it("arrive at sign up with list code, sign up, confirm, log in, and redirect to profile with list code", () => {});
  });

  describe("LinkedIn", () => {});
});
