import {CreateCurrentFolder} from "../src/background.js";
import { throws } from "assert";

const chrome = require('sinon-chrome');

describe("background.js ", () => {
  describe("create folder ", () => {

    beforeAll(function() {
        global.chrome = chrome;
    });

    afterEach(function() {
        chrome.flush();
    })

    afterAll(() => delete global.chrome);

    it('should create a folder in the other bookmarks' + 
            ' if it does not already exist', () => {
        expect(chrome.bookmarks.search.notCalled).toBe(true);
        CreateCurrentFolder("test_folder");
        expect(chrome.bookmarks.search.calledOnce).toBe(true);
    });

    // it('should call bookmarks.create atleast once if' + 
    //     ' bookmarks.search returns nothing', () => {
    //         chrome.bookmarks.search.yields([]);
    //         CreateCurrentFolder("test_folder");
    //         expect(chrome.bookmarks.create.notCalled).toBe(true);
    // });

    // it('should call bookmarks.create twice if' + 
    //     'bookmars.search returns non-empty array', () => {
    //         chrome.bookmarks.search.callsFake(() => {
    //             console.log("Fake search call returning empty array");
    //             return ['some fake data'];
    //         });         
    //         CreateCurrentFolder("test_folder");
    //         expect(chrome.bookmarks.s)   
    // });

    it('should call fake bookmark.search', () => {
        chrome.bookmarks.search.callsFake(() => {
            console.log("This is a fake call");
        });
        CreateCurrentFolder("test_folder");
    });

    it('should not call bookmarks.create if bookmarks.search fails', () => {
        chrome.bookmarks.search.callsFake(() => {
            console.log("This is a fake 2 call");
            throw new Error("This is an error in bookmarks.search");
        });
        CreateCurrentFolder("test_folder");
        expect(chrome.bookmarks.create.notCalled).toBe(true);
    });
  });
});