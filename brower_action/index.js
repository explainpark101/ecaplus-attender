window.addEventListener('DOMContentLoaded', () => {
  renderAll();
})

const storageGet = (key) => new Promise((resolve, reject)=>{
  chrome.storage.local.get(key, (res)=>resolve(res));
})

const renderAll = async () => {
  const keys = ["institute-code", "password-code"];
  const elements = keys.map(key=>document.querySelector(`[name='${key}']`));
  elements.forEach(element=>{
    element.addEventListener("input", ({target})=>{
      const {value, name} = target;
      let data = {};
      data[name] = value;
      chrome.storage.local.set(data);
    });
    storageGet(element.name)
    .then(data=>{
      element.value = data ?? '';
    });
  })
}