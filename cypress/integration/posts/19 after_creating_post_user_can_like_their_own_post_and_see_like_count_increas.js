describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    
    // sign up
    cy.visit("/users/signup");
    cy.get("#username").type("User1");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#Submit").click();

    // sign in
    cy.visit("/sessions/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#Submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("self like test");
    cy.get("#new-post-form").submit();

    //clikc like
    cy.get("#likes-form").submit()
    cy.get(".posts").should("eq", "1 like");

      });
});