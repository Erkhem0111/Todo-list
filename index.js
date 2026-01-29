const list = document.querySelector(".list");
const input = document.querySelector("#textInput");
const add = document.querySelector(".Add");
const buttons = document.querySelectorAll(".Container2 div");
let content = [];
let type = "All";
let id = 1;
const ListItem = (item) => {
  return `
    <div class="item">
      <div class="box">
        <input id="${item.id}"class="checkbox" type="checkbox" ${
          item.isDone ? "checked" : ""
        } />
        <p>${item.text}</p>
      </div>  
      <div id="${item.id}" class="delete-btn">Delete</div>
    </div>

  `;
};
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    content.push({
      id: id,
      text: input.value,
      isDone: false,
    });
    id++;
    input.value = "";

    render();
  }
});
add.addEventListener("click", () => {
  content.push({
    id: id,
    text: input.value,
    isDone: false,
  });
  id++;
  input.value = "";

  render();
});
buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("chosen");
    });
    btn.classList.add("chosen");
    if (i === 0) {
      type = "All";
    } else if (i === 1) {
      type = "Active";
    } else {
      type = "Completed";
    }
    render();
  });
});

const render = () => {
  const elements = content
    .filter((item) => {
      if (type === "All") return true;
      if (type === "Active") return item.isDone === false;
      return item.isDone === true;
    })
    .map((item) => ListItem(item))
    .join("");
  list.innerHTML = elements;

  const count = document.querySelector(".taskCount");
  count.textContent = `${content.filter((item) => item.isDone).length} of ${
    content.length
  } tasks completed`;
  const clear = document.querySelector(".Container3 .clearBtn");
  clear.textContent = `Clear completeted`;
  clear.addEventListener("click", () => {
    content.length = 0;
    list.innerHTML = "";
    list.textContent = "No tasks yet. Add one above!";
    count.textContent = "";
    clear.textContent = "";
  });
  addListeners();
};
const addListeners = () => {
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const count = document.querySelector(".taskCount");
  const clear = document.querySelector(".Container3 .clearBtn");
  if (content.length === 0) {
    list.textContent = "No tasks yet. Add one above!";
    count.style.display = "none";
    clear.style.display = "none";
  } else {
    count.style.display = "block";
    clear.style.display = "block";
  }
  deleteBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      content = content.filter((item) => item.id != btn.id);
      render();
    });
  });
  const checkbox = document.querySelectorAll(".checkbox");
  checkbox.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const item = content.find((item) => item.id == checkbox.id);
      item.isDone = !item.isDone;
      render();
    });
  });
};
