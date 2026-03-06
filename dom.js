const form = document.getElementById("student-form");
const nameInput = document.getElementById("student-name");
const rollInput = document.getElementById("roll");
const studentList = document.getElementById("student-list");
const totalText = document.getElementById("total");
const attendanceText = document.getElementById("attendance");
const addBtn = document.getElementById("add-btn");
const searchInput = document.getElementById("search");

let presentCount = 0;

/*  Disable Add button when name empty */
nameInput.addEventListener("input", function(){
    addBtn.disabled = nameInput.value.trim() === "";
});

/* Add Student */
form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = nameInput.value;
    const roll = rollInput.value;

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="info">${roll} - ${name}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        <label>
            <input type="checkbox" class="presentCheck"> Present
        </label>
    `;

    studentList.appendChild(li);

    updateTotal();

    nameInput.value="";
    rollInput.value="";
    addBtn.disabled=true;
});

/* Delete + Edit */
studentList.addEventListener("click", function(e){

    /* Delete Student */
    if(e.target.classList.contains("delete")){

        if(confirm("Are you sure you want to delete this student?")){

            const li = e.target.parentElement;

            if(li.querySelector(".presentCheck").checked){
                presentCount--;
            }

            li.remove();

            updateTotal();
            updateAttendance();
        }
    }

    /* Edit Student */
    if(e.target.classList.contains("edit")){

        const li = e.target.parentElement;

        const text = li.querySelector(".info").textContent;

        const parts = text.split(" - ");

        const newRoll = prompt("Edit Roll No", parts[0]);
        const newName = prompt("Edit Student Name", parts[1]);

        li.querySelector(".info").textContent = `${newRoll} - ${newName}`;
    }
});

/* Present / Absent */
studentList.addEventListener("change", function(e){

    if(e.target.classList.contains("presentCheck")){

        const li = e.target.parentElement.parentElement;

        if(e.target.checked){
            li.classList.add("present");
            presentCount++;
        }
        else{
            li.classList.remove("present");
            presentCount--;
        }

        updateAttendance();
    }
});

/* Update total students */
function updateTotal(){

    const total = studentList.children.length;

    totalText.textContent = "Total students: " + total;
}

/* Update attendance */
function updateAttendance(){

    const total = studentList.children.length;

    const absent = total - presentCount;

    attendanceText.textContent =
        `Present: ${presentCount} , Absent: ${absent}`;
}

/* Search Student */
searchInput.addEventListener("input", function(){

    const filter = searchInput.value.toLowerCase();

    const students = studentList.getElementsByTagName("li");

    for(let s of students){

        const text =
        s.querySelector(".info").textContent.toLowerCase();

        if(text.includes(filter)){
            s.style.display="";
        }
        else{
            s.style.display="none";
        }
    }
});

/* Sort Students A-Z */
document.getElementById("sort-btn").addEventListener("click", function(){

    const students = Array.from(studentList.children);

    students.sort((a,b)=>{

        const nameA =
        a.querySelector(".info").textContent.toLowerCase();

        const nameB =
        b.querySelector(".info").textContent.toLowerCase();

        return nameA.localeCompare(nameB);
    });

    students.forEach(li => studentList.appendChild(li));
});

/* Highlight first student */
document.getElementById("highlight-btn").addEventListener("click", function(){

    const students = studentList.querySelectorAll("li");

    students.forEach(s => s.classList.remove("highlight"));

    if(students.length > 0){
        students[0].classList.add("highlight");
    }
});