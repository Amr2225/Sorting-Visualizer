const container = document.querySelector(".container");
const sortbtn = document.querySelector(".sort");
const resetbtn = document.querySelector(".reset");
const selector = document.querySelector("#selector");

const list = Array(50).fill(null);
const HEIGHT_MULTIPLIER = 3;
const DELAY = 100;
let isActive = false;

document.addEventListener("DOMContentLoaded", renderer);
sortbtn.addEventListener("click", async () => {
  if (!isActive) {
    if (selector.value === "bubble") {
      bubbleSort();
    } else {
      isActive = true;
      console.log("Merge sort in action..");
      await mergeSort().then(() => {
        isActive = false;
      });
    }
  }
});
resetbtn.addEventListener("click", renderer);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mergeSort() {
  const nodeList = document.querySelectorAll(".array");
  const bars = Array.from(nodeList);
  await sorting(bars, 0, bars.length - 1).then((res) => {
    console.log(bars.map((bar) => bar.dataset.height));
    greenHighlight();
  });

  async function sorting(arr, l, r) {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);
      await sorting(arr, l, m);
      await sorting(arr, m + 1, r);

      await merge(arr, l, m, r);
    }
  }

  async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const leftArray = Array(n1).fill(null);
    const rightArray = Array(n2).fill(null);

    for (let i = 0; i < leftArray.length; i++) {
      leftArray[i] = arr[l + i];
    }
    for (let j = 0; j < rightArray.length; j++) {
      rightArray[j] = arr[m + 1 + j]; // We add one because the mid we already have in the left subarray
    }

    let i = 0;
    let j = 0;
    let k = l;
    while (i < n1 && j < n2) {
      await sleep(DELAY / 3);
      if (+leftArray[i].dataset.height <= +rightArray[j].dataset.height) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }

      arr[k].style.backgroundColor = "red";
      k++;
    }

    await sleep(DELAY / 3);
    while (i < n1) {
      arr[k] = leftArray[i];
      arr[k].style.backgroundColor = "red";
      i++;
      k++;
    }

    await sleep(DELAY / 3);
    while (j < n2) {
      arr[k] = rightArray[j];
      arr[k].style.backgroundColor = "red";
      j++;
      k++;
    }

    await sleep(DELAY / 3);
    for (let bar of arr) {
      bar.style.backgroundColor = "black";
      container.appendChild(bar);
    }
  }
}

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
  isActive = false;
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
    div.dataset.height = i;
    div.style.height = `${i * HEIGHT_MULTIPLIER}px`;
    div.style.width = `${width}px`;
    div.style.backgroundColor = "black";
    container.appendChild(div);
  }
}
