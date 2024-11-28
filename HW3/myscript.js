$(document).ready(function () {
    // Initialize validation on the form
    $('#input-form').validate({
        // Validation rules
        rules: {
            input1: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            input2: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            input3: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            input4: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        // Custom error messages
        messages: {
            input1: {
                required: "Please enter a number for Min X.",
                number: "Min X must be a valid number.",
                range: "Min X must be between -50 and 50."
            },
            input2: {
                required: "Please enter a number for Max X.",
                number: "Max X must be a valid number.",
                range: "Max X must be between -50 and 50."
            },
            input3: {
                required: "Please enter a number for Min Y.",
                number: "Min Y must be a valid number.",
                range: "Min Y must be between -50 and 50."
            },
            input4: {
                required: "Please enter a number for Max Y.",
                number: "Max Y must be a valid number.",
                range: "Max Y must be between -50 and 50."
            }
        },
        // Adjust error message placement
        errorPlacement: function (error, element) {
            error.insertAfter(element); // Place error message directly after the input field
        },
        // Submit handler
        submitHandler: function () {
            // If the form is valid, generate the multiplication table
            const xMin = Number($('input[name="input1"]').val());
            const xMax = Number($('input[name="input2"]').val());
            const yMin = Number($('input[name="input3"]').val());
            const yMax = Number($('input[name="input4"]').val());

            // Clear previous table
            $('#multiplication-table').html(generateTable(xMin, xMax, yMin, yMax));
        }
    });

    // Trigger form validation and submission when the button is clicked
    $('.btn-submit').on('click', function () {
        $('#input-form').submit(); // Trigger validation
    });

    // Function to generate the multiplication table
    function generateTable(xMin, xMax, yMin, yMax) {
        let tableHtml = '<table class="table"><tr><th>*</th>';

        // Generate header row for x values (xMin to xMax)
        for (let x = xMin; x <= xMax; x++) {
            tableHtml += `<th>${x}</th>`;
        }
        tableHtml += '</tr>';

        // Generate rows for each y value (yMin to yMax)
        for (let y = yMin; y <= yMax; y++) {
            tableHtml += `<tr><th>${y}</th>`; // First cell in row is the y value
            for (let x = xMin; x <= xMax; x++) {
                tableHtml += `<td>${x * y}</td>`; // Multiply x and y for the cell value
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        return tableHtml;
    }
});
