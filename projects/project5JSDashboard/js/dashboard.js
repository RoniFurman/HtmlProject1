let changeWidth = document.querySelector("#changeWidth");
let changeHeight = document.querySelector("#changeHeight");
let area = document.querySelector("#area");
let fSize = document.querySelector("#fSize");
let container = document.querySelector("#container");
let changeColor = document.querySelector("#changeColor");
let fColor = document.querySelector("#fColor");
let btnAdd = document.querySelector("#btnAdd");
const chooseElement = document.getElementById("chooseElement");
const chooseFont = document.getElementById("chooseFont");

let selectedFunction = null;

function addDiv(content) {
  let newDiv = document.createElement("div");
  newDiv.textContent = content;
  container.appendChild(newDiv);
}
function addH1(content) {
  let newH1 = document.createElement("h1");
  newH1.textContent = content;
  container.appendChild(newH1);
}
function addH2(content) {
  let newH2 = document.createElement("h2");
  newH2.textContent = content;
  container.appendChild(newH2);
}
function addP(content) {
  let newP = document.createElement("p");
  newP.textContent = content;
  container.appendChild(newP);
}

chooseElement.addEventListener("change", () => {
  const elementType = chooseElement.value;

  switch (elementType) {
    case "div":
      selectedFunction = addDiv;
      break;
    case "h1":
      selectedFunction = addH1;
      break;
    case "h2":
      selectedFunction = addH2;
      break;
    case "p":
      selectedFunction = addP;
      break;
    default:
      selectedFunction = null;
  }
});

chooseFont.addEventListener("change", () => {
  const fontType = document.getElementById("chooseFont");

  container.style.fontFamily = fontFamily;
});

btnAdd.addEventListener("click", () => {
  const widthChange = document.getElementById("changeWidth").value;
  container.style.width = `${widthChange}px`;
  const heightChange = document.getElementById("changeHeight").value;
  container.style.height = `${heightChange}px`;

  function updateBackgroundColor() {
    const colorChange = changeColor.value;
    container.style.backgroundColor = colorChange;
  }
  changeColor.addEventListener("input", updateBackgroundColor);
  updateBackgroundColor();

  function updateFontColor() {
    const fontColorChange = fColor.value;
    container.style.color = fontColorChange;
  }

  fColor.addEventListener("input", updateFontColor);
  updateFontColor();

  const fontSizeChange = document.getElementById("fSize").value;
  container.style.fontSize = `${fontSizeChange}rem`;

  const addContent = document.getElementById("area").value;

  if (selectedFunction) {
    selectedFunction(addContent);
  } else {
    console.log("No element type selected");
  }
});
