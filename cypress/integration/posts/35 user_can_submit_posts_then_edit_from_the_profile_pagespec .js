describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    
      // sign up
      cy.visit("/users/signup");
      cy.get("#username").type("User1");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password1");
      cy.get("#submit-signup-button").click();

      // sign in
      cy.visit("/sessions/login");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password1");
      cy.get("#submit-login-button").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Test1");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Test1");

    //got to profile page
    cy.visit("/users/User1")
    cy.get("#submit-edit-button").click;
    cy.get("#content").find('[type="text"]').type("Test 2");

    cy.get(".posts").should("contain", "Test 2");

  });
});