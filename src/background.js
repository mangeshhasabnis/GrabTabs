/*
Author: Mangesh Hasabnis
*/

const ParentBookmarFolder = 'GrabTabs Bookmarks';
var currentFolderName = '';

// chrome.browserAction.onClicked.addListener(function() {
//     CheckParentBookmarkFolderExists().then(CreateGroupBookmark);
// });

const CreateCurrentFolder = (folderName) => {
    currentFolderName = folderName;
    CheckParentBookmarkFolderExists().then(CreateGroupBookmark);
};

const CheckParentBookmarkFolderExists = () => {
    return new Promise(function(resolve, reject) {
        chrome.bookmarks.search(ParentBookmarFolder, function(bookmarks) {
            resolve(bookmarks);
        });
    })
};

const CreateGroupBookmark = (bookmarks) => {
    GetRootFolder(bookmarks).then(function(parentBookmark) {
        GetAllTabs().then(function(tabs) {
            chrome.bookmarks.create({
                'title': currentFolderName,
                'parentId': parentBookmark.id
            }, function(newFolder) {
                CreateBookmark(tabs, newFolder.id);
            });
            
        })
    });
};

function GetAllTabs() {
    var tabQueryInfo = {
        currentWindow: true
    };

    return new Promise(function(resolve) {
        chrome.tabs.query(tabQueryInfo, function(tabs) {
            resolve(tabs);
        });
    })

};

function CreateBookmark(tabs, parentId) {
    for(let tab in tabs) {
        chrome.bookmarks.create({
            'parentId': parentId,
            'index': parseInt(tab),
            'title': tabs[tab].title,
            'url': tabs[tab].url
        });
    }
    window.close();
};

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

export {
    CreateCurrentFolder
};



