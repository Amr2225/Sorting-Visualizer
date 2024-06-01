const container = document.querySelector(".container");
const sortbtn = document.querySelector(".sort");
const resetbtn = document.querySelector(".reset");
const selector = document.querySelector("#selector");

const list = Array(50).fill(null);
const HEIGHT_MULTIPLIER = 3;
const DELAY = 100;

document.addEventListener("DOMContentLoaded", renderer);
sortbtn.addEventListener("click", () => {
  if (selector.value === "bubble") {
    bubbleSort();
  } else {
    console.log("Merge sort in action..");
  }
});
resetbtn.addEventListener("click", renderer);

function bubbleSort() {
  console.log("Bubble Sort");
  const nodeList1 = document.querySelectorAll(".array");
  const arrs = Array.from(nodeList1);
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = 0; j < list.length - i - 1; j++) {
      setTimeout(() => {
        if (list[j] > list[j + 1]) {
          arrs[j].style.backgroundColor = "red";
          arrs[j + 1].style.backgroundColor = "red";

          [list[j], list[j + 1]] = [list[j + 1], list[j]];
          [arrs[j], arrs[j + 1]] = [arrs[j + 1], arrs[j]];

          setTimeout(() => {
            arrs[j].style.backgroundColor = "black";
            arrs[j + 1].style.backgroundColor = "black";
            for (let item of arrs) {
              container.appendChild(item);
            }
          }, DELAY);
        }
      }, i * DELAY);
    }
  }
  setTimeout(() => {
    greenHighlight();
  }, (list.length - 7) * DELAY);
}

// function greenHighlight() {
//   const nodeList1 = document.querySelectorAll(".array");
//   const arrs = Array.from(nodeList1);
//   for (let i = arrs.length - 1; i >= 0; i--) {
//     setTimeout(() => {
//       console.log(i);
//       arrs[i].style.backgroundColor = "green";

//       setTimeout(() => {
//         arrs[i].style.backgroundColor = "black";
//       }, DELAY / 3);
//     }, (arrs.length - 1 - i) * (DELAY / 3));
//   }
// }

function greenHighlight() {
  const nodeList1 = document.querySelectorAll(".array");
  const arrs = Array.from(nodeList1);
  for (let i = arrs.length - 1; i >= 0; i--) {
    setTimeout(() => {
      arrs[i].style.backgroundColor = "green";
    }, (arrs.length - 1 - i) * (DELAY / 3));
  }

  setTimeout(() => {
    for (let i = arrs.length - 1; i >= 0; i--) {
      setTimeout(() => {
        arrs[i].style.backgroundColor = "black";
      }, (arrs.length - 1 - i) * (DELAY / 3));
    }
  }, (arrs.length - 1) * (DELAY / 3));
}

function renderer() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let i in list) {
    list[i] = Math.floor(Math.random() * 100) + 1;
  }
  for (let i of list) {
    const width = container.offsetWidth / list.length;
    const div = document.createElement("div");
    div.classList.add("array");
    div.style.height = `${i * HEIGHT_MULTIPLIER}px`;
    div.style.width = `${width}px`;
    div.style.backgroundColor = "black";
    container.appendChild(div);
  }
}
