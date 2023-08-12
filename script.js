const addButton = document.querySelector(".add");

const updateLSData = ()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })

    // add local Storage
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');
    
    const htmlData = ` <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "": "hidden"}"></div>
    <textarea class="${text ? "hidden": ""}"></textarea> `;

    note.insertAdjacentHTML('beforeend',htmlData);

    // getting refrences
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the Node
    deleteButton.addEventListener('click',()=>{
        note.remove();
        updateLSData();
    });

    // to dispaly existing data
    textArea.value=text;
    mainDiv.innerHTML=text;

    // toggle using edit button
    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML=value;
        updateLSData();
    });

    document.body.appendChild(note);


}

// fetching data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note)=> addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());