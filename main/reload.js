chrome.storage.local.get(["activation"], ({ activation }) => {
  setTimeout(() => {
    if (activation) window.location.href = "http://ecaplus.co.kr/attend/";
  }, 1000);
});
