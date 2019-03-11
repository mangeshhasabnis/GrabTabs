import {CheckParentBookmarkFolderExists, CreateGroupBookmark}
    from './background.js';


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("btnOk").onclick = OnOkClickHandler;
});

function OnOkClickHandler() {
    CheckParentBookmarkFolderExists().then(CreateGroupBookmark);
}