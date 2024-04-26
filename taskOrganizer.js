const input1 = document.getElementById('input');
const add = document.getElementById("add");
const UL = document.getElementById('myUL');


function inputValue() {
    return input1.value.length;
}

add.addEventListener("click", function(){
    if (inputValue()> 1){
        const newDiv = document.createElement('div');
        const li = document.createElement('li');
        const doneBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        newDiv.classList.add('item-container')
        UL.append(newDiv);
        li.appendChild(document.createTextNode(input1.value))
        li.classList.add('item')
        doneBtn.classList.add('doneBtn');
        delBtn.classList.add('delBtn');
        doneBtn.innerHTML= '<i class="fa-solid fa-square-check"></i>'
        delBtn.innerHTML= '<i class="fa-solid fa-trash"></i>'
        newDiv.append(li,doneBtn,delBtn);
        doneBtn.addEventListener('click' ,function(){
            li.classList.toggle('done');
        })
        delBtn.addEventListener('click', function(){
            newDiv.remove();
        })
        input1.value = " ";
    }
})

input1.addEventListener('keypress',function(event){
    if( inputValue()> 1 && event.code === 'Enter'){
        const newDiv = document.createElement('div');
        const li = document.createElement('li');
        const doneBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        newDiv.classList.add('item-container')
        UL.append(newDiv);
        li.appendChild(document.createTextNode(input1.value))
        li.classList.add('item')
        doneBtn.classList.add('doneBtn');
        delBtn.classList.add('delBtn');
        doneBtn.innerHTML= '<i class="fa-solid fa-square-check"></i>'
        delBtn.innerHTML= '<i class="fa-solid fa-trash"></i>'
        newDiv.append(li,doneBtn,delBtn);
        doneBtn.addEventListener('click' ,function(){
            li.classList.toggle('done');
        })
        delBtn.addEventListener('click', function(){
            newDiv.remove();
        })
        input1.value = " ";
    }
})