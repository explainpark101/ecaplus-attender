
chrome.storage.local.get(["activation"], ({activation})=>{
    if(activation) window.location.href = "http://ecaplus.co.kr";
});