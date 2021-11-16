/* Formatting function for row details - modify as you need */
function format(d) {

    // d.features.forEach(feature => {});

    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Feature:</td>' +
        '<td>' + d.features[0].test + '</td>' +
        '</tr>' +
        '</table>';
}

$(document).ready(function () {
    var table = $('#example').DataTable({
        'ajax': {'url': 'http://localhost:3000/api/project/getall',
                 'type': 'GET',
                 'dataSrc': ''
                },
        'columns': [{
                'className': 'details-control',
                'orderable': false,
                'data': null,
                'defaultContent': ''
            },
            {
                data: 'title'
            },
            {
                data: 'description'
            },
            {
                data : 'date'
            },
            {
                data: 'category'
            }
        ],
        'order': [
            [1, 'asc']
        ]
    });

    //Controls for buttons
    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    // Handle click on "Expand All" button
    $('#btn-show-all-children').on('click', function () {
        // Enumerate all rows
        table.rows().every(function () {
            // If row has details collapsed
            if (!this.child.isShown()) {
                // Open this row
                this.child(format(this.data())).show();
                $(this.node()).addClass('shown');
            }
        });
    });

    // Handle click on "Collapse All" button
    $('#btn-hide-all-children').on('click', function () {
        // Enumerate all rows
        table.rows().every(function () {
            // If row has details expanded
            if (this.child.isShown()) {
                // Collapse row details
                this.child.hide();
                $(this.node()).removeClass('shown');
            }
        });
    });
});