function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


const storageGet = (key) => new Promise((resolve, reject)=>{
    console.log(key, chrome.storage.local.get(key, (data)=>console.log(data)))
    chrome.storage.local.get(key, (res)=>resolve(res));
});

const renderAll = () => {
    const instituteInput = document.querySelector(`[name="기관"]`);
    const passwordInput = document.querySelector(`[name="비밀번호"]`);
    storageGet(["institute-code", "password-code"]).then(data=>{
        return new Promise(resolve=>{
            instituteInput.value = data["institute-code"] ?? '';
            passwordInput.value = data["password-code"] ?? '';
            instituteInput.dispatchEvent(new Event("input"));
            passwordInput.dispatchEvent(new Event("input"));
            console.log(data);
            if(instituteInput && passwordInput) resolve({
                기관: data["institute-code"],
                비밀번호: data["password-code"],
            });
        })
    })
    .then((data)=>{
        return fetch(window.location.href, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify(data)
        })
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
        if(data.success && data.redirect)
            window.location.href = data.redirect;
    })
}

setInterval(()=>{
    chrome.storage.local.get(["activation"], ({activation})=>{
        if(!activation) {
            if(!document.querySelector("div.no-extension")){
                let div = document.createElement("div");
                div.classList = "no-extension d-none";
                document.body.appendChild(div);
            }
            return;
        }
        else{
            renderAll();
        }
    });
}, 500);