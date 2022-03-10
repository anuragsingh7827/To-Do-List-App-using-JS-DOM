const input = document.querySelector('input');
const ul = document.querySelector('ul');
const form = document.querySelector('form');
let storedTodos = JSON.parse(window.localStorage.getItem('toDoItems'));

function makeLi(todo){
    const li = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    if(todo.checked){
        checkBox.setAttribute('checked',true);
    }
    li.append(checkBox);
    checkBox.classList.add('checkbox');

    const spanText = document.createElement('span');
    spanText.innerText = todo.todoText;

    li.append(spanText);
    spanText.classList.add('spantext');
    if(todo.checked) spanText.classList.add('linethrough')

    const spanEdit = document.createElement('span');
    const penIcon = document.createElement('i');
    penIcon.setAttribute('class','fas fa-pen');
    spanEdit.append(penIcon);
    li.append(spanEdit);
    spanEdit.classList.add('spanedit');
    if(todo.checked) penIcon.classList.add('disabled-spanedit-i');
    spanEdit.addEventListener('click', () => {
        if (spanText.classList.contains('linethrough')){
            alert("Can't edit a checked To-do!!");
            return;
        }

        const tranparentDiv = document.createElement('div');
        ul.append(tranparentDiv);
        tranparentDiv.classList.add('transparent-sheet');

        const h2 = document.querySelector('h2');
        const editWrappper = document.createElement('form');
        const editInput = document.createElement('input');
        editInput.setAttribute('maxlength','40');
        editWrappper.append(editInput);
        editInput.classList.add('input');
        editInput.classList.add('editinput')


        const update = document.createElement('button');
        update.innerText = 'Update';
        editWrappper.append(update);
        update.classList.add('btn');
        update.classList.add('editbtn');
        h2.after(editWrappper);
        editWrappper.classList.add('editwrapper');

        
        const temp = spanText.innerText;
        editInput.value = temp;
        editInput.focus();

        update.addEventListener('click', () => {
            
            storedTodos.forEach((todo) => {
                if(todo.todoText === li.children[1].innerText)  todo.todoText = editInput.value
            });
            window.localStorage.setItem('toDoItems',JSON.stringify(storedTodos));

            spanText.innerText = editInput.value;

            editWrappper.remove();
            tranparentDiv.remove();
        });
    });

    checkBox.addEventListener('click',function(){
        storedTodos.forEach((todo) => {
            if(todo.todoText === li.children[1].innerText){
                todo.checked ? todo.checked = false : todo.checked = true
            } 
        });
        window.localStorage.setItem('toDoItems',JSON.stringify(storedTodos));

        spanText.classList.toggle('linethrough');
        penIcon.classList.toggle('disabled-spanedit-i');
    });

    const spanTrash = document.createElement('span');
    const trashIcon = document.createElement('i');
    trashIcon.setAttribute('class','fas fa-trash-alt');
    spanTrash.append(trashIcon); 
    li.append(spanTrash);
    spanTrash.classList.add('spantrash');
    spanTrash.addEventListener('click', () => {

        storedTodos.forEach((todo) => {
            if(todo.todoText === li.children[1].innerText) storedTodos.splice(storedTodos.indexOf(todo),1)
        });

        window.localStorage.setItem('toDoItems',JSON.stringify(storedTodos));

        li.remove();
    });

    const spanUp = document.createElement('span');
    const upIcon = document.createElement('i');
    upIcon.setAttribute('class','fas fa-chevron-up');
    spanUp.append(upIcon);
    li.append(spanUp);
    spanUp.classList.add('spanup');
    spanUp.addEventListener('click',() => {
        if (li.previousElementSibling === null){
            return;
        }

        let swapped = false
        storedTodos.forEach((todo, index) => {
            if(!swapped && todo.todoText === li.children[1].innerText){
                swapped = true;
                [storedTodos[index-1],storedTodos[index]] = [storedTodos[index],storedTodos[index-1]]
            } 
        });

        window.localStorage.setItem('toDoItems',JSON.stringify(storedTodos));


        const prevLi = li.previousElementSibling;
        prevLi.before(li);
    });

    const spanDown = document.createElement('span');
    const downIcon = document.createElement('i');
    downIcon.setAttribute('class','fas fa-chevron-down');
    spanDown.append(downIcon);
    li.append(spanDown);
    spanDown.classList.add('spandown');
    spanDown.addEventListener('click',() => {
        if (li.nextElementSibling === null){
            return;
        }

        let swapped=false;
        storedTodos.forEach((todo, index) => {
            if(!swapped && todo.todoText === li.children[1].innerText){
                swapped = true;
                [storedTodos[index],storedTodos[index+1]] = [storedTodos[index+1],storedTodos[index]]
            } 
        });

        window.localStorage.setItem('toDoItems',JSON.stringify(storedTodos));


        const nextLi = li.nextElementSibling;
        nextLi.after(li);
    });


    const colorBackgrounds = ['li1','li2','li3','li4','li5','li6','li7','li8','li9','li10'];
    const index = Math.floor(Math.random()*10);
    li.classList.add(colorBackgrounds[index]);

    ul.append(li);
    
}

function updateDomWithOldToDos(){

    if(storedTodos!=null){

        for(let todo of storedTodos){
    
            makeLi(todo)
            
        }
    
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = input.value;
    if (todoText === ''){
        alert('Empty To-do!!');
        return;
    }

    if(storedTodos!=null){
        storedTodos = [...storedTodos,{
            checked: false,
            todoText: todoText
        }]
    }else{
        storedTodos = [{
            checked: false,
            todoText: todoText
        }];
    }

    window.localStorage.setItem('toDoItems',JSON.stringify(storedTodos));

    makeLi({
        checked: false,
        todoText: todoText
    });

    input.value = '';
   
});

updateDomWithOldToDos();