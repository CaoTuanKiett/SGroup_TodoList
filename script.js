// Reset Input
function resetInput() {
    document.getElementById("category").value = "";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}


// SHOW AddNew ToDo

// document.querySelector('.header__right--content').onclick = () =>{
//     document.querySelector('.addNew').classList.toggle('displayFlex');
// }

document.querySelector('.addNew__overlay').onclick = () =>{
    document.querySelector('.addNew').classList.toggle('displayFlex');
}

document.querySelector('.addNew__iconCancel').onclick = () =>{
    document.querySelector('.addNew').classList.toggle('displayFlex');
}






// Kiểm tra input nhập dữ liệu chưa

function valueInput() {
    const inputAddSelect = document.querySelectorAll('.inputAdd');
    const valueNull = document.querySelectorAll('.value__null')

    inputAddSelect.forEach((element, index)=> {
        if(element.value === "" ){
            valueNull.forEach((option, key ) => {

                if (index == key) {
                    option.innerText = `Vui lòng nhập thông tin`
                }

            })
        }else {
            valueNull.forEach((option, key ) => {

                if (index == key) {
                    option.innerText = ``
                }

            })
        }

    });
}

function addNew() {
    valueInput()

    const valueNull = document.querySelectorAll(".value__null") 

    let arrValueNull = [];

    valueNull.forEach((element) => {
        arrValueNull.push(element.innerText);
    })
    
    let checkValueNull = arrValueNull.every(value => value === "");

    if(checkValueNull) {
        let category = document.getElementById("category").value;
        let title = document.getElementById("title").value;
        let content = document.getElementById("content").value;

        let listTodo = localStorage.getItem("list_Todo") ? JSON.parse(localStorage.getItem("list_Todo")) : [];

        listTodo.push({
            category: category,
            title: title,
            content: content
        })

        localStorage.setItem("list_Todo", JSON.stringify(listTodo));
        
        document.querySelector('.addNew').classList.toggle('displayFlex');

        resetInput()
        renderTodo()
    }

}

function renderTodo() {
    let listTodo = localStorage.getItem("list_Todo") ? JSON.parse(localStorage.getItem("list_Todo")) : [];
    
    let list = ''

    let today = new Date();
    const options = {
        year: "numeric",
        day: "numeric",
        month: "long",
    };
    let dateToday = today.toLocaleDateString("en-US", options);

    listTodo.map((value, index) => {
        list += `<div class="item">
            <div class="item__header">
                <div class="item__header--title">
                    <p class="item__title">${value.category}</p> 
                    <p class="item__name" >${value.title}</p>
                </div>
                
                
                <div class="item__header--icon">
                    <i onclick="clickEdit(${index})" class="icon_edit fa-solid fa-pen"></i>
                    <i onclick="deleteTodo(${index})" class="icon_delete fa-solid fa-trash-can"></i>

                </div>
            </div>

            <div class="item__content">
                <p>${value.content}</p>
            </div>

            <div class="item__date">
                <i class="fa-regular fa-clock"></i>
                <p class="date">${dateToday}</p>
            </div>

            
        </div>`
    })


    document.querySelector(".todoList").innerHTML = list;

}



function renderDoing() {
    let listTodo = localStorage.getItem("list_Todo") ? JSON.parse(localStorage.getItem("list_Todo")) : [];
    
    let list = ''

    let today = new Date();
    const options = {
        year: "numeric",
        day: "numeric",
        month: "long",
    };
    let dateToday = today.toLocaleDateString("en-US", options);

    listTodo.map((value, index) => {
        list += `<div class="item">
            <div class="item__header">
                <div class="item__header--title">
                    <p class="item__title">${value.category}</p> 
                    <p class="item__name" >${value.title}</p>
                </div>
                
                
                <div class="item__header--icon">
                    <i onclick="clickEdit(${index})" class="icon_edit fa-solid fa-pen"></i>
                    <i class="icon_delete fa-solid fa-trash-can"></i>
                </div>
            </div>

            <div class="item__content">
                <p>${value.content}</p>
            </div>

            <div class="item__date">
                <i class="fa-regular fa-clock"></i>
                <p class="date">${dateToday}</p>
            </div>
        </div>`
    })

    document.querySelector(".doingList").innerHTML = list;

}


function renderFinished() {
    let listTodo = localStorage.getItem("list_Todo") ? JSON.parse(localStorage.getItem("list_Todo")) : [];
    
    let list = ''

    let today = new Date();
    const options = {
        year: "numeric",
        day: "numeric",
        month: "long",
    };
    let dateToday = today.toLocaleDateString("en-US", options);

    listTodo.map((value, index) => {
        list += `<div class="item">
            <div class="item__header">
                <div class="item__header--title">
                    <p class="item__title">${value.category}</p> 
                    <p class="item__name" >${value.title}</p>
                </div>
                
                
                <div class="item__header--icon">
                    <i onclick="clickEdit(${index})" class="icon_edit fa-solid fa-pen"></i>
                    <i class="icon_delete fa-solid fa-trash-can"></i>
                </div>
            </div>

            <div class="item__content">
                <p>${value.content}</p>
            </div>

            <div class="item__date">
                <i class="fa-regular fa-clock"></i>
                <p class="date">${dateToday}</p>
            </div>
        </div>`
    })

    document.querySelector(".finishedList").innerHTML = list;

}




// Show Edit 

function clickEdit(index) {
    document.querySelector('.editTodo').classList.toggle('displayFlex');

    let listTodo = localStorage.getItem("list_Todo") ? JSON.parse(localStorage.getItem("list_Todo")) : [];
    
    document.getElementById("edtCategory").value = listTodo[index].category;
    document.getElementById("edtTitle").value = listTodo[index].title;
    document.getElementById("edtContent").value = listTodo[index].content;
    document.getElementById("index").value = index;


}

function changeTodo(){
    let listTodo = localStorage.getItem("list_Todo") ? JSON.parse(localStorage.getItem("list_Todo")) : [];

    let index = document.getElementById("index").value;  

    listTodo[index] = {
        category: document.getElementById("edtCategory").value,
        title: document.getElementById("edtTitle").value,
        content: document.getElementById("edtContent").value
    }

    localStorage.setItem("list_Todo", JSON.stringify(listTodo));

    renderTodo();

    
    document.querySelector('.editTodo').classList.toggle('displayFlex');
}

// const editOption = document.querySelectorAll('.icon_edit')
// editOption.forEach(option => {
//     option.addEventListener('click', () => {
//         document.querySelector('.editTodo').classList.toggle('displayFlex');
//     });
// });

document.querySelector('.editTodo_overlay').onclick = () =>{
    document.querySelector('.editTodo').classList.toggle('displayFlex');
}

document.querySelector('.edit__iconCancel').onclick = () =>{
    document.querySelector('.editTodo').classList.toggle('displayFlex');
}





// Delete 
const deleteOption = document.querySelectorAll('.icon_delete')
deleteOption.forEach(option => {
    option.addEventListener('click', () => {
    
        alert('Bạn có chắc chắn muốn xóa không ??');
        
    });
});

function deleteTodo(index) {
    let listTodo = localStorage.getItem("list_Todo") ? JSON.parse(localStorage.getItem("list_Todo")) : [];

    listTodo.splice(index, 1);
    localStorage.setItem("list_Todo", JSON.stringify(listTodo));

    renderTodo()
}







