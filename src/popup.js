import {CreateCurrentFolder}
    from './background.js';


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("btnOk").onclick = OnOkClickHandler;
});

function OnOkClickHandler() {
    const textboxElement = document.getElementById("txtFolderName");

    CreateCurrentFolder(textboxElement.value);
}