async function getData() {
  const url = "https://picsum.photos/v2/list?page=2&limit=11";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    let imgArray = [];
    json.forEach((element) => {
      imgArray.push({
        url: element.download_url,
        width: element.width,
        height: element.height,
      });
    });
    console.log(imgArray);

    const tableImg = document.getElementById("tableImg");
    imgArray.forEach((element) => {
      if (element.width == 2500 && element.height == 1667) {
        tableImg.innerHTML += `<img src="${element.url}" alt="image" class="table-img">`;
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

getData();

async function init() {
  const node = document.querySelector("#type-text");

  await sleep(1000);
  node.innerText = "";
  
  while (true) {
    await sleep(2000);
    await node.type("Hello,");
    await sleep(2000);
    await node.type(" What is your next project?");
    await sleep(2000);
    await node.delete("Hello, What is your next project?");
    await node.type(" Please tell us about your next project.");
    await sleep(2000);
    await node.delete("Please tell us about your next project.");
    await node.type(" Contact us?");
    await sleep(2000);
    await node.delete(" Contact us?");
  }
}

// Source code 🚩

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

class TypeAsync extends HTMLSpanElement {
  get typeInterval() {
    const randomMs = 100 * Math.random();
    return randomMs < 50 ? 10 : randomMs;
  }

  async type(text) {
    for (let character of text) {
      this.innerText += character;
      await sleep(this.typeInterval);
    }
  }

  async delete(text) {
    for (let character of text) {
      this.innerText = this.innerText.slice(0, this.innerText.length - 1);
      await sleep(this.typeInterval);
    }
  }
}

customElements.define("type-async", TypeAsync, { extends: "span" });
init();

function bringUp() {
  var bringUpIcon = document.getElementById("bringUpIcon");
  bringUpIcon.style.transitionDelay = "1s"; 
  window.addEventListener("scroll", function () {
    if (scrollY != 101) {
        bringUpIcon.style.display = "block";
    }
    else {
      bringUpIcon.style.display = "none";
    }
  })
}

bringUp()

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}
window.onscroll = function() {scrollProgress()};