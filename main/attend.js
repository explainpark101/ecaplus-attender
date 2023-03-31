const renderAll = () => {
    chrome.storage.local.get(["activation"], ({activation})=>{
        if(!activation) {
            document.body.insertAdjacentHTML("beforeend","<div class='no-extension d-none'></div>");
            return;
        }
        const checkbox_elements = [
            document.querySelector("#kitty-mode"),
            document.querySelector("#corgi-mode"),
            document.querySelector("[name='hide-records']"),
        ]
        checkbox_elements.forEach(el=>{
            el.checked = true;
            el.dispatchEvent(new Event("change"));
        })
    });
}


renderAll();
    