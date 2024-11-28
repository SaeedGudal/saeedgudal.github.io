/*
    Name: Saeed Gudal
    Date: 11/27/24
    Class: GUI 1
    Email: Saeed_Gudal@student.uml.edu
*/

$(document).ready(function () {
    // Initialize jQuery UI sliders
    createSliders();

    // On submit, create a new tab with a table
    $("#submit-button").on("click", function () {
        createTable();
        createTab();
    });

    // Initialize jQuery UI Tabs
    $("#tabs").tabs();

    // Two-way binding for sliders and input fields
    function createSliders() {
        $("#row1-slider").slider({
            min: 0,
            max: 50,
            value: 1,
            slide: function(event, ui) {
                $("#row1").val(ui.value);
            }
        });

        $("#row2-slider").slider({
            min: 0,
            max: 50,
            value: 5,
            slide: function(event, ui) {
                $("#row2").val(ui.value);
            }
        });

        $("#col1-slider").slider({
            min: 0,
            max: 50,
            value: 1,
            slide: function(event, ui) {
                $("#col1").val(ui.value);
            }
        });

        $("#col2-slider").slider({
            min: 0,
            max: 50,
            value: 5,
            slide: function(event, ui) {
                $("#col2").val(ui.value);
            }
        });

        // Update sliders when user manually changes input fields
        $("#row1, #row2, #col1, #col2").on('change', function () {
            const id = $(this).attr("id");
            $("#" + id + "-slider").slider("value", $(this).val());
        });
    }

    // Function to create the multiplication table
    function createTable() {
        const rowStart = parseInt($("#row1").val());
        const rowEnd = parseInt($("#row2").val());
        const colStart = parseInt($("#col1").val());
        const colEnd = parseInt($("#col2").val());

        let table = "<table><thead><tr><th></th>";

        // Create column headers
        for (let c = colStart; c <= colEnd; c++) {
            table += `<th>${c}</th>`;
        }

        table += "</tr></thead><tbody>";

        // Create table rows
        for (let r = rowStart; r <= rowEnd; r++) {
            table += `<tr><td>${r}</td>`;
            for (let c = colStart; c <= colEnd; c++) {
                table += `<td>${r * c}</td>`;
            }
            table += "</tr>";
        }

        table += "</tbody></table>";
        $("#table-container").html(table);
    }

    // Function to create a new tab with the table content
    function createTab() {
        const numTabs = $("#tabs ul li").length + 1;
        const rowStart = $("#row1").val();
        const rowEnd = $("#row2").val();
        const colStart = $("#col1").val();
        const colEnd = $("#col2").val();

        const tabTitle = `Table ${numTabs} (Rows: ${rowStart}-${rowEnd}, Cols: ${colStart}-${colEnd})`;

        // Add new tab
        $("#tabs ul").append(
            `<li><a href="#tab-${numTabs}">${tabTitle}</a><span class="delete-tab">X</span></li>`
        );
        $("#tabs").append(`<div id="tab-${numTabs}">${$("#table-container").html()}</div>`);
        $("#tabs").tabs("refresh");

        // Use event delegation to handle the click for dynamically added delete buttons
        $("#tabs").on("click", ".delete-tab", function() {
            const tab = $(this).parent(); // The tab <li> element
            const tabId = tab.index(); // Get the index of the tab

            // Remove the corresponding tab and tab content
            tab.remove(); // Remove tab header
            $("#tabs div").eq(tabId).remove(); // Remove the corresponding tab content

            // Refresh the tabs
            $("#tabs").tabs("refresh");
        });
    }
});
