import {CreateCurrentFolder} from "../src/background.js";

describe("background.js ", () => {
  describe("create folder ", () => {
    it("should create a folder in the other bookmarks", () => {
      CreateCurrentFolder("test_folder");
    });
  });
});