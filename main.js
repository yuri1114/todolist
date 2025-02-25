//아무런 할일 없을 때
//만약에 todo-item이 없다면 empty를 보이고, 그렇지 않다면 지워라.

//할일 추가 Add버튼
function addTodoList() {
  //1. 인풋에 입력
  const todoText = document.getElementById("todoInput");

  //2. 입력한 내용의 todo-item 폼 생성!
  const todoItem = document.createElement("div");
  const itemContainer = document.querySelector(".list-to-do");

  todoItem.classList.add("todo-item");
  todoItem.innerHTML = `
    <div class="left-item">
      <input type="checkbox" />
      <p class="work-text">${todoText.value}</p>
    </div>

    <div class="right-item">
      <button class="edit-btn" onClick="editTodo(this)">수정</button>
      <button class="edit-btn delete" onClick="deleteTodo()">삭제</button>
    </div>
  `;

  itemContainer.appendChild(todoItem);

  //3. item 생성 후, input 글 지우기.
  todoText.value = "";

  emptyText();
}

//삭제하기
function deleteTodo() {
  const todoItem = document.querySelector(".todo-item");
  todoItem.remove();
  emptyText();
}

//todo item 없을 때 함수.
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

  modal.dataset.targetIndex = [
    ...document.querySelectorAll(".work-text"),
  ].indexOf(workText); // index 저장

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
