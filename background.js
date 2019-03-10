/*
Author: Mangesh Hasabnis
*/

(function() {

    const ParentBookmarFolder = 'GrabTabs Bookmarks';

    chrome.browserAction.onClicked.addListener(function() {
        CheckParentBookmarkFolderExists().then(CreateGroupBookmark);
    });

    function CreateGroupBookmark(bookmarks) {
        GetRootFolder(bookmarks).then(function(parentBookmark) {
            GetAllTabs().then(function(tabs) {
                CreateBookmark(tabs, parentBookmark.id);
            })
        });
    }

    function GetAllTabs() {

        var tabQueryInfo = {
            currentWindow: true
        };

        return new Promise(function(resolve) {
            chrome.tabs.query(tabQueryInfo, function(tabs) {
                resolve(tabs);
            });
        })

    }

    function CreateBookmark(tabs, parentId) {
        for(tab in tabs) {
            console.log(tab);
            chrome.bookmarks.create({
                'parentId': parentId,
                'index': parseInt(tab),
                'title': tabs[tab].title,
                'url': tabs[tab].url
            });
        }
    }

    function GetRootFolder(bookmarks) {
        return new Promise(function(resolve) {
            var bookmarkFolder;

            if(bookmarks.length === 0) {
                chrome.bookmarks.create({
                    'title': ParentBookmarFolder
                }, function(newFolder) {
                    console.log("Added new folder" + newFolder);
                    bookmarkFolder = newFolder;
                    resolve(bookmarkFolder);
                });
            } else {
                bookmarkFolder = bookmarks[0];
                resolve(bookmarkFolder);
            }        
        });
    };

    function CheckParentBookmarkFolderExists() {
        return new Promise(function(resolve, reject) {
            chrome.bookmarks.search(ParentBookmarFolder, function(bookmarks) {
                resolve(bookmarks);
            });
        })
    }
})();
