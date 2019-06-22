import {CreateCurrentFolder}
    from './background.js';


document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("btn-ok").onclick = OnOkClickHandler;
});

function OnOkClickHandler() {
    const textboxElement = document.getElementById("txt-folder-name");

    CreateCurrentFolder(textboxElement.value);
}