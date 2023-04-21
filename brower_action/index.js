window.addEventListener('DOMContentLoaded', () => {
  renderAll();
})

const storageGet = (key) => new Promise((resolve, reject)=>{
  chrome.storage.local.get(key, (res)=>resolve(res));
})

const renderAll = async () => {
  const activationCheckbox = document.querySelector("#activate");
  storageGet(["activation"])
  .then(({activation:checked})=>{
    activationCheckbox.checked = checked;
    activationCheckbox.addEventListener("change", ({currentTarget})=>{
      chrome.storage.local.set({activation:currentTarget.checked});
    });
  })

  const keys = ["institute-code", "password-code"];
  const elements = keys.map(key=>document.querySelector(`[name='${key}']`));
  elements.forEach(element=>{
    element.addEventListener("input", ({target})=>{
      const {value: val, name} = target;
      target.value = val.toUpperCase();
      if(target.length > 5) target.value = target.value.slice(0,5);

      const value = target.value;
      let data = {};
      data[name] = value;
      data["시도횟수"] = 0;
      chrome.storage.local.set(data);
    });
    element.addEventListener("focus", ({currentTarget})=>{
      if(!activationCheckbox.checked)
          currentTarget.blur();
    })
    element.addEventListener("keydown", ({keyCode})=>{
      if(keyCode==13) window.open("http://ecaplus.co.kr/attend/");
    })
    storageGet(element.name)
    .then(data=>{
      element.value = data[element.name] ?? '';
    });
  })

  

}

document.querySelector("a").addEventListener("click", ({currentTarget})=>{
  const {href} = currentTarget;
  window.open(href);
})


fetch("../manifest.json")
.then(resp=>resp.json())
.then(({version})=>{
  document.querySelector("#version").innerText = `version: ${version}`;
})
