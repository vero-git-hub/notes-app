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

    rowData.forEach(data => {
        const row = createTableRow(data);
        tableBody.appendChild(row);
    });
});
