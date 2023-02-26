// Reset Input
function resetInput() {
  document.getElementById("category").value = "";
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

// ngày tháng năm
function date(){

  const newDays = document.querySelectorAll('.date')

  let today = new Date();
  const options = {
  year: "numeric",
  day: "numeric",
  month: "long",
  // hour: "numeric",
  // minute: "numeric",
  };
  let dateToday = today.toLocaleDateString("en-US", options);

  return dateToday;

}



// SHOW AddNew ToDo

document.querySelector(".header__right--content").onclick = () => {
  document.querySelector(".addNew").classList.toggle("displayFlex");
};

document.querySelector(".addNew__overlay").onclick = () => {
  document.querySelector(".addNew").classList.toggle("displayFlex");
};

document.querySelector(".addNew__iconCancel").onclick = () => {
  document.querySelector(".addNew").classList.toggle("displayFlex");
};

// Kiểm tra input nhập dữ liệu chưa

function valueInput() {
  const inputAddSelect = document.querySelectorAll(".inputAdd");
  const valueNull = document.querySelectorAll(".value__null");

  inputAddSelect.forEach((element, index) => {
    if (element.value === "") {
      valueNull.forEach((option, key) => {
        if (index == key) {
          option.innerText = `Vui lòng nhập thông tin`;
        }
      });
    } else {
      valueNull.forEach((option, key) => {
        if (index == key) {
          option.innerText = ``;
        }
      });
    }
  });
}


// Them mới Item
function addNew() {
  valueInput();

  const valueNull = document.querySelectorAll(".value__null");

  let arrValueNull = [];

  valueNull.forEach((element) => {
    arrValueNull.push(element.innerText);
  });

  let checkValueNull = arrValueNull.every((value) => value === "");

  if (checkValueNull) {
    let category = document.getElementById("category").value;
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    let listTask = localStorage.getItem("list_Task")
      ? JSON.parse(localStorage.getItem("list_Task"))
      : [];

    listTask.push({
      id: listTask.length + 1,
      category: category,
      title: title,
      content: content,
      date: date(),
      status: '0',
    });

    localStorage.setItem("list_Task", JSON.stringify(listTask));

    document.querySelector(".addNew").classList.toggle("displayFlex");

    resetInput();
    renderTask();
  }
}

// Render
function renderTask() {
  let listTask = localStorage.getItem("list_Task")
    ? JSON.parse(localStorage.getItem("list_Task"))
    : [];

  let listTo = "";
  let listDoing = "";
  let listFinis = "";



  listTask.forEach((item, index) => {
    if (item.status == 0) {
      listTo += `<div class="item " draggable="true">
                <div class="item__header">
                    <div class="item__header--title">
                        <p class="item__id" style="display: none;">${item.id}</p>
                        <p class="item__title">${item.category}</p> 
                        <p class="item__name" >${item.title}</p>
                    </div>
                    
                    
                    <div class="item__header--icon">
                        <i onclick="clickEdit(${index})" class="icon_edit fa-solid fa-pen"></i>
                        <i onclick="deleteTodo(${index})" class="icon_delete fa-solid fa-trash-can"></i>

                    </div>
                </div>

                <div class="item__content">
                    <p>${item.content}</p>
                </div>

                <div class="item__date">
                    <i class="fa-regular fa-clock"></i>
                    <p class="date">${item.date}</p>
                </div>

                
            </div>`;

      document.querySelector(".todoList").innerHTML = listTo;
    } else if (item.status == 1) {
      listDoing += `<div class="item" draggable="true">
                    <div class="item__header">
                        <div class="item__header--title">
                            <p class="item__id" style="display: none;">${item.id}</p>
                            <p class="item__title">${item.category}</p> 
                            <p class="item__name" >${item.title}</p>
                        </div>
                        
                        
                        <div class="item__header--icon">
                            <i onclick="clickEdit(${index})" class="icon_edit fa-solid fa-pen"></i>
                            <i onclick="deleteTodo(${index})" class="icon_delete fa-solid fa-trash-can"></i>

                        </div>
                    </div>

                    <div class="item__content">
                        <p>${item.content}</p>
                    </div>

                    <div class="item__date">
                        <i class="fa-regular fa-clock"></i>
                        <p class="date">${item.date}</p>
                    </div>

                
                </div>`;

      document.querySelector(".doingList").innerHTML = listDoing;
    } else {
      listFinis += `<div class="item" draggable="true">
                    <div class="item__header">
                        <div class="item__header--title">
                            <p class="item__id" style="display: none;">${item.id}</p>
                            <p class="item__title">${item.category}</p> 
                            <p class="item__name" >${item.title}</p>
                        </div>
                        
                        
                        <div class="item__header--icon">
                            <i onclick="clickEdit(${index})" class="icon_edit fa-solid fa-pen"></i>
                            <i onclick="deleteTodo(${index})" class="icon_delete fa-solid fa-trash-can"></i>

                        </div>
                    </div>

                    <div class="item__content">
                        <p>${item.content}</p>
                    </div>

                    <div class="item__date">
                        <i class="fa-regular fa-clock"></i>
                        <p class="date">${item.date}</p>
                    </div>

                
                </div>`;

      document.querySelector(".finishedList").innerHTML = listFinis;
    }
  });

  renderNumber()
  date()
  
  dragDrop()


}

// Show Edit

function clickEdit(index) {
  document.querySelector(".editTodo").classList.toggle("displayFlex");

  let listTask = localStorage.getItem("list_Task")
    ? JSON.parse(localStorage.getItem("list_Task"))
    : [];

  document.getElementById("edtCategory").value = listTask[index].category;
  document.getElementById("edtTitle").value = listTask[index].title;
  document.getElementById("edtContent").value = listTask[index].content;

  const radioButtons = document.getElementsByName("status");

  // radioChecked
  radioButtons.forEach((radio) => {
    if (radio.value == listTask[index].status) {
      radio.checked = true;
    }
  });

  document.getElementById("index").value = index;


  // Turn Off Edit
  document.querySelector(".editTodo_overlay").onclick = () => {
    document.querySelector(".editTodo").classList.toggle("displayFlex");
  };
  
  document.querySelector(".edit__iconCancel").onclick = () => {
    document.querySelector(".editTodo").classList.toggle("displayFlex");
  };
}

// Edit Item
function changeTodo() {
  let listTask = localStorage.getItem("list_Task")
    ? JSON.parse(localStorage.getItem("list_Task"))
    : [];

  let index = document.getElementById("index").value;

  const radioButtons = document.getElementsByName("status");
  let statusValue = null;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      statusValue = radioButtons[i].value;
    }
  }


  listTask[index] = {
    category: document.getElementById("edtCategory").value,
    title: document.getElementById("edtTitle").value,
    content: document.getElementById("edtContent").value,
    date: document.querySelector('.date').innerText,
    status: statusValue,
  };

  localStorage.setItem("list_Task", JSON.stringify(listTask));

  renderTask();

  document.querySelector(".editTodo").classList.toggle("displayFlex");
}



// Delete Item
function deleteTodo(index) {
  
  if(confirm("Bạn có chắc chắn muốn xóa không ??") == true){
    let listTask = localStorage.getItem("list_Task")
    ? JSON.parse(localStorage.getItem("list_Task"))
    : [];

    listTask.splice(index, 1);
    localStorage.setItem("list_Task", JSON.stringify(listTask));

    renderTask();
  }

  
}



// hàm tính số item có trong từng list với x là vị trí status
function outputNumber(x){
  let listNum = [];
  let listTask = localStorage.getItem("list_Task")
    ? JSON.parse(localStorage.getItem("list_Task"))
    : [];

  listTask.forEach((item)=>{
    if(item.status == x) {
      listNum.push(item.status);
    }
  })

  return listNum.length;
}

function renderNumber() {

  const numberTodo = document.querySelector('.number__todo');
  const numberDoing = document.querySelector('.number__doing');
  const numberFinished = document.querySelector('.number__finished');


  numberTodo.innerText = outputNumber(0);
  numberDoing.innerText = outputNumber(1);
  numberFinished.innerText = outputNumber(2)

}


// kéo thả item

// write a function to drag and drop items in a list
function dragDrop() {
  const boxLists = document.querySelectorAll(".list__item");
  const itemDrag = document.querySelectorAll(".item");
  let idItem = null;

  let listTask = localStorage.getItem("list_Task")
    ? JSON.parse(localStorage.getItem("list_Task"))
    : [];



  itemDrag.forEach((item, index) => {
    item.addEventListener("dragstart", (event) => {
      idItem = event.target.querySelector(".item__id").innerText;
      event.dataTransfer.setData("text/plain", index);
    });
  });

  boxLists.forEach((box, indexBox) => {
    box.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    box.addEventListener("drop", function (e) {
      const idDrop = e.dataTransfer.getData("text/plain");

      e.target.appendChild(itemDrag[idDrop]);
     
      listTask.forEach((item) => {
        if (item.id == idItem) {
          item.status = indexBox;
          localStorage.setItem("list_Task", JSON.stringify(listTask));
        }

      });

    });

    
  });
}







