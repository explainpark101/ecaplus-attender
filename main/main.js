/**
 * LocalStorage를 이용하여 코드가 맞을 경우, 사용가능한 상태로 변경됨.
 * @returns boolean : 활성화여부
 */
const activationTest = async (callback) => {
  // console.log(chrome.storage.local);
  let resultParent = false;
  await chrome.storage.local.get("EiE_ASSIST_activation", (result) => {
    let activationKey = result.EiE_ASSIST_activation;
    // console.log(activationKey);
    let activationList = ["01088009369", "01041229369"];
    if (activationList.includes(activationKey)) {
      resultParent = true;
    }
    if (resultParent) {
      callback();
    } else {
      console.log("Authentication Failed");
    }
  });
};

activationTest(renderMain);
