
import LoginPage from "../../pageObjects/login.page";
import HomePage from "../../pageObjects/home.page";
import SwipePage from "../../pageObjects/swipe.page";

describe("Android Mobile automation tests", () => {
    it("should check the title on home page", async () => {
      expect(await HomePage.getTitle()).toHaveTitle("WEBDRIVER1");
    });
  
    it("should login into the app successfully", async () => {
        await HomePage.openLoginScreen();
        await LoginPage.login("Test@email.com", "Pass12345");
        expect(await LoginPage.successMessageTitle()).toEqual("Success");
        expect(await LoginPage.successMessage()).toEqual("You are logged in!");
        await LoginPage.closePopup(); 
    });
    it("should be able to swipe based on element displayed", async () => {
        await HomePage.openSwipeMenu();
        await SwipePage.checkifCommunityTextIsDisplayed();
        expect(await SwipePage.greatCommunityText()).toEqual("GREAT COMMUNITY");
      });
})