document.addEventListener("DOMContentLoaded", function() {
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

    const tableBody = document.getElementById("table-body");
    const addNoteModal = new bootstrap.Modal(document.getElementById("addNoteModal"));

    function createTableRow(data) {
        const row = document.createElement("tr");
        for (const key in data) {
            const cell = document.createElement("td");
            if (key === "icons") {
                data[key].forEach(iconClass => {
                const icon = document.createElement("i");
                icon.className = iconClass;
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
        rowData.forEach(data => {
          const row = createTableRow(data);
          tableBody.appendChild(row);
        });
    }

    const createNoteButton = document.getElementById("create-note-btn");
    createNoteButton.addEventListener("click", function() {
        document.getElementById("noteName").value = "";
        document.getElementById("noteContent").value = "";

        const noteCategorySelect = document.getElementById("noteCategory");
        noteCategorySelect.value = "Task";

        const addNoteModal = new bootstrap.Modal(document.getElementById("addNoteModal"));
        addNoteModal.show();
    });

    const saveNoteButton = document.getElementById("saveNoteBtn");
    saveNoteButton.addEventListener("click", function() {
        const name = document.getElementById("noteName").value;
        const content = document.getElementById("noteContent").value;
        const category = document.getElementById("noteCategory").value;

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

    updateTable();
});
