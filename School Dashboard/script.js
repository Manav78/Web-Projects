let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const searchBox = document.getElementById("searchBox");

// Render all student rows
function renderTable(data = students) {
  tableBody.innerHTML = "";
  data.forEach((student, i) => {
    const row = `<tr>
      <td>${student.name}</td>
      <td>${student.reg}</td>
      <td>${student.dept}</td>
      <td>${student.year}</td>
      <td>${student.marks}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editStudent(${i})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${i})">Delete</button>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// Add or update student
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const student = {
    name: form.name.value.trim(),
    reg: form.reg.value.trim(),
    dept: form.dept.value.trim(),
    year: form.year.value.trim(),
    marks: form.marks.value.trim()
  };

  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderTable();
});

// Edit a student
function editStudent(index) {
  const s = students[index];
  form.name.value = s.name;
  form.reg.value = s.reg;
  form.dept.value = s.dept;
  form.year.value = s.year;
  form.marks.value = s.marks;
  editIndex = index;
}

// Delete a student
function deleteStudent(index) {
  if (confirm("Delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
}

// Filter/search
searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query) || s.reg.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

// Initial load
renderTable();
