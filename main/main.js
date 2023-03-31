const checkThisURL = () => {
  chrome.storage.local.get(["activation"], ({activation})=>{
    if(!activation) return;
    if(!window.location.pathname.endsWith("attend/") && !window.location.pathname.endsWith("main")){
      window.location.href = "http://ecaplus.co.kr/attend/";
      return;
    }
  });
}
checkThisURL();


