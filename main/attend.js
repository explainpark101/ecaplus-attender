const renderAll = () => {
    chrome.storage.local.get(["activation"], ({activation})=>{
        if(!activation) {
            document.body.insertAdjacentHTML("beforeend","<div class='no-extension d-none'></div>");
            return;
        }

        const themes = document.querySelector(".visually-hidden-fullscreen:has(.themes)");
        const previewImages = document.querySelector("div.input-group:has([for='image-preview-input'])");
        previewImages.insertAdjacentElement("afterEnd", themes);

        const checkbox_elements = [
            document.querySelector("#kitty-mode"),
            document.querySelector("#corgi-mode"),
            document.querySelector("[name='hide-records']"),
        ]
        checkbox_elements.forEach(el=>{
            el.checked = true;
            el.dispatchEvent(new Event("change"));
        })

        setTimeout(()=>{
            location.reload();
        },1000*3600)
    });
}


renderAll();
    