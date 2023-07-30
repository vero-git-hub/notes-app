const tableBody = document.getElementById("table-body");
const addNoteModal = new bootstrap.Modal(document.getElementById("addNoteModal"));
const editNoteModal = new bootstrap.Modal(document.getElementById("editNoteModal"));

document.addEventListener("DOMContentLoaded", function() {
    const categories = ["Task", "Random Thought", "Idea"];
    const noteCategorySelect = document.getElementById("noteCategory");
    const editNoteCategorySelect = document.getElementById("editNoteCategory");
    const archiveTable = document.getElementById("archiveTable");
    const archiveTableBody  = archiveTable.querySelector("tbody");

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        noteCategorySelect.appendChild(option);
        editNoteCategorySelect.appendChild(option.cloneNode(true));

        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.textContent = category;

        row.appendChild(cell);

        archiveTableBody.appendChild(row);
    });

    const rowData = [
        {
            name: "Row 1, Column 1",
            created: "Row 1, Column 2",
            category: "Row 1, Column 3",
            content: "Row 1, Column 4",
            dates: "Row 1, Column 5",
            icons: [
                "bi bi-pencil-square",
                "bi bi-archive-fill",
                "bi bi-trash-fill"
            ]
        },
        {
            name: "Row 2, Column 1",
            created: "Row 2, Column 2",
            category: "Row 2, Column 3",
            content: "Row 2, Column 4",
            dates: "Row 2, Column 5",
            icons: [
                "bi bi-pencil-square",
                "bi bi-archive-fill",
                "bi bi-trash-fill"
            ]
        },
        {
            name: "Row 3, Column 1",
            created: "Row 3, Column 2",
            category: "Row 3, Column 3",
            content: "Row 3, Column 4",
            dates: "Row 3, Column 5",
            icons: [
                "bi bi-pencil-square",
                "bi bi-archive-fill",
                "bi bi-trash-fill"
            ]
        }

    ];

    function createTableRow(data, index) {
        const row = document.createElement("tr");
        row.setAttribute("data-index", index);

        for (const key in data) {
            const cell = document.createElement("td");

            if (key === "icons") {
                data[key].forEach(iconClass => {
                    const icon = document.createElement("i");
                    icon.className = iconClass;

                    if (iconClass.includes("bi-trash-fill")) {
                        icon.id = "deleteIcon";
                        icon.addEventListener("click", function() {
                            const parentRow = this.closest("tr");
                            const rowIndex = parentRow.getAttribute("data-index");
                            rowData.splice(rowIndex, 1);
                            updateTable();
                        });
                    }

                    if (iconClass.includes("bi-pencil-square")) {
                        icon.id = "editIcon";
                        icon.addEventListener("click", function() {
                          const parentRow = this.closest("tr");
                          const rowIndex = parentRow.getAttribute("data-index");
                          const noteData = rowData[rowIndex];
          
                          document.getElementById("editNoteName").value = noteData.name;
                          document.getElementById("editNoteCategory").value = noteData.category;
                          document.getElementById("editNoteContent").value = noteData.content;

                          editNoteModal._element.setAttribute("data-row-index", rowIndex);
          
                          editNoteModal.show();
                        });
                    }

                    cell.appendChild(icon);
                });
            } else {
                cell.textContent = data[key];
            }

            row.appendChild(cell);
        }
        return row;
    }

    function updateTable() {
        tableBody.innerHTML = "";

        rowData.forEach((data, index) => {
          const row = createTableRow(data, index);
          tableBody.appendChild(row);
        });
    }

    const createNoteButton = document.getElementById("create-note-btn");
    createNoteButton.addEventListener("click", function() {
        document.getElementById("noteName").value = "";
        document.getElementById("noteContent").value = "";

        const noteCategorySelect = document.getElementById("noteCategory");
        noteCategorySelect.value = "Task";

        addNoteModal.show();
    });

    const saveNoteButton = document.getElementById("saveNoteBtn");
    saveNoteButton.addEventListener("click", function() {
        const name = document.getElementById("noteName").value;
        const category = noteCategorySelect.value;
        const content = document.getElementById("noteContent").value;

        const currentDate = new Date();
        const createdOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedCreated = currentDate.toLocaleDateString('en-US', createdOptions);

        const datesRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
        const datesArray = content.match(datesRegex);

        const formattedDates = datesArray ? datesArray.map(dateStr => {
            const dateParts = dateStr.split('/');
            return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
          }) : [];

        const newNote = {
        name: name,
        created: formattedCreated,
        category: category,
        content: content,
        dates: formattedDates.join(', '),
        icons: [
            "bi bi-pencil-square",
            "bi bi-archive-fill",
            "bi bi-trash-fill"
        ]
        };
        rowData.push(newNote);
        updateTable();

        addNoteModal.hide();
    });

    const cancelNoteButton = document.getElementById("cancelNoteBtn");
    cancelNoteButton.addEventListener("click", function() {
        addNoteModal.hide();
    });

    const closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener('click', function() {
        addNoteModal.hide();
    })

    const cancelEditNoteButton = document.getElementById("cancelEditNoteButton");
    cancelEditNoteButton.addEventListener("click", function() {
        editNoteModal.hide();
    });

    const closeEditModalButton =  document.getElementById("closeEditModalButton");
    closeEditModalButton.addEventListener('click', function() {
        editNoteModal.hide();
    })

    const saveEditedNoteButton = document.getElementById("saveEditedNoteBtn");
    saveEditedNoteButton.addEventListener("click", function() {
        const editedName = document.getElementById("editNoteName").value;
        const editedCategory = editNoteCategorySelect.value;
        const editedContent = document.getElementById("editNoteContent").value;

        const rowIndex = editNoteModal._element.getAttribute("data-row-index");

        rowData[rowIndex].name = editedName;
        rowData[rowIndex].category = editedCategory;
        rowData[rowIndex].content = editedContent;

        const datesRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
        const datesArray = editedContent.match(datesRegex);

        const formattedDates = datesArray ? datesArray.map(dateStr => {
            const dateParts = dateStr.split('/');
            return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
        }) : [];

        rowData[rowIndex].dates = formattedDates.join(', ');

        updateTable();

        editNoteModal.hide();
    });

    updateTable();
});