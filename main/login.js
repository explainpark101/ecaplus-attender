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
    chrome.storage.local.get(key, (res)=>resolve(res));
});

const renderAll = () => {
    const instituteInput = document.querySelector(`[name="기관"]`);
    const passwordInput = document.querySelector(`[name="비밀번호"]`);
    storageGet(["institute-code", "password-code", "시도횟수"]).then(data=>{
        return new Promise(resolve=>{
            instituteInput.value = data["institute-code"] ?? '';
            passwordInput.value = data["password-code"] ?? '';
            instituteInput.dispatchEvent(new Event("input"));
            passwordInput.dispatchEvent(new Event("input"));
            if(instituteInput && passwordInput) resolve({
                기관: data["institute-code"],
                비밀번호: data["password-code"],
                시도횟수: data.시도횟수,
            });
        })
    })
    .then((data)=>{
        if(data.시도횟수??0 > 100) return;
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
        if(data.success && data.redirect){
            window.location.href = data.redirect;
            document.body.style.backgroundColor = "";
        }
        else {
            alert("비밀번호를 확인하고 확장프로그램을 다시 실행시켜주세요.");
            chrome.storage.local.set({activation:false});
            document.body.style.backgroundColor = "red";
            localStorage.setItem("시도횟수", localStorage.getItem("시도횟수")+1);
        }
    })
};
(
    ()=>{
        let interval = setInterval(()=>{
            chrome.storage.local.get(["activation"], ({activation})=>{
                if(!activation) {
                    if(!document.querySelector("div.no-extension")){
                        let div = document.createElement("div");
                        div.classList = "no-extension d-none";
                        document.body.appendChild(div);
                    }
                    clearInterval(interval);
                    return;
                }
                else{
                    renderAll();
                }
            });
        }, 500);
    }
)();
