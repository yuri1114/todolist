// 페이지가 로드될 때마다 실행
window.onload = function () {
  loadFromLocalStorage();
};

function loadFromLocalStorage() {
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos) {
    const todos = JSON.parse(storedTodos);
    todos.forEach((todo) => addTodoToDOM(todo.text, todo.checked));

    emptyText();
  }
}

//할일 추가 Add버튼
function addTodoList() {
  const todoInput = document.getElementById("todoInput");
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("할 일을 입력해주세요!"); // 빈 값일 경우 얼럿 띄우기
    return;
  }

  addTodoToDOM(todoText, false);
  saveToLocalStorage();
  //입력 input 초기화
  todoInput.value = "";

  //todo item 없을 때
  emptyText();
}

//할 일을 DOM에 추가하는 함수
function addTodoToDOM(text, isChecked) {
  const todoItem = document.createElement("div");
  const itemContainer = document.querySelector(".list-to-do");

  todoItem.classList.add("todo-item");
  todoItem.innerHTML = `
    <div class="left-item">
      <input onchange="doneTodo(this)" class="item-checkbox" type="checkbox" ${
        isChecked ? "checked" : ""
      } />
      <p class="work-text ${isChecked ? "checked" : ""}">${text}</p>
    </div>
    <div class="right-item">
      <button class="edit-btn" onClick="editTodo(this)">수정</button>
      <button class="edit-btn delete" onClick="deleteTodo(this)">삭제</button>
    </div>
  `;

  itemContainer.appendChild(todoItem);
}

//삭제하기
function deleteTodo(button) {
  const todoItem = button.closest(".todo-item");
  todoItem.remove();
  emptyText();
  saveToLocalStorage();
}

//todo item 없을 때
function emptyText() {
  //list-to-do의 todo-item이 없으면
  //empty-text가 block이고
  //있으면 none
  const todoItem = document.querySelectorAll(".todo-item");
  const empty = document.querySelector(".empty-text");
  const itemLength = todoItem.length;

  console.log("??", itemLength);
  if (itemLength === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
  }
}

// 수정 기능
function editTodo(button) {
  //수정버튼을 누르면 얼럿창 뜨기.
  //얼럿에 input내용 가지고오기.
  //수정한 내용 다시 저장하기.
  const todoItem = button.closest(".todo-item");
  const workText = todoItem.querySelector(".work-text");
  const modal = document.querySelector(".edit-modal");
  const modalInput = document.getElementById("editInput");

  modalInput.value = workText.textContent;

  // index 저장
  modal.dataset.targetIndex = [
    ...document.querySelectorAll(".work-text"),
  ].indexOf(workText);

  console.log(modal.dataset.targetIndex);

  modal.classList.add("show-modal");
}

function save() {
  //input에 수정한 글을
  //가져왔던 해당 todo-item의 .work-text에 보여주기.
  const modal = document.querySelector(".edit-modal");
  const modalInput = document.getElementById("editInput");

  const targetIndex = modal.dataset.targetIndex;
  const workTextList = document.querySelectorAll(".work-text");

  if (targetIndex !== undefined && workTextList[targetIndex]) {
    workTextList[targetIndex].textContent = modalInput.value;
  }

  modal.classList.remove("show-modal");
}

//체크박스
function doneTodo(checkbox) {
  const todoItem = checkbox.closest(".todo-item");
  const workText = todoItem.querySelector(".work-text");
  console.log("??", checkbox.checked);

  //만약에 체크박스가 체크드 되면,
  //work-text에 스타일추가

  if (checkbox.checked) {
    workText.classList.add("checked");
  } else {
    workText.classList.remove("checked");
  }

  saveToLocalStorage();
}

let isFiltered = false;
//필터
function filter() {
  //필터 버튼을 한번 누르면 checked된 항목은 보이지 않음.
  //필터 버튼을 다시 한번 누르면 모든 항목 보임.

  const todoItems = document.querySelectorAll(".todo-item");
  let checkedFound = false;
  isFiltered = !isFiltered;
  if (isFiltered) {
    // 체크된 항목 숨기기
    todoItems.forEach((item) => {
      const checkbox = item.querySelector("input[type='checkbox']");

      if (checkbox.checked) {
        item.style.display = "none"; // 체크된 항목 숨김
        checkedFound = true;
      }
    });

    // 체크된 항목이 없으면 얼럿 띄우기
    if (!checkedFound) {
      alert("완료된 할 일이 없습니다.");
    }
  } else {
    // 모든 항목 보이기
    todoItems.forEach((item) => {
      item.style.display = "flex"; // 항목 보이기
    });
  }
}

//로컬스토리지 저장
function saveToLocalStorage() {
  const todoItems = document.querySelectorAll(".todo-item");
  const todos = [];

  todoItems.forEach((item) => {
    const workText = item.querySelector(".work-text").textContent;
    const isChecked = item.querySelector("input[type='checkbox']").checked;
    todos.push({ text: workText, checked: isChecked });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
