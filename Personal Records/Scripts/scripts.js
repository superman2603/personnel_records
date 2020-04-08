$(document).ready(function () {



    var editor = new $.fn.dataTable.Editor({
        ajax: 'PersonnelRecords/CRUD',
        table: '#personnelRecords',
        idSrc: "id",
        fields: [
            {
                "label": "payroll_number:",
                "name": "payroll_number"
            },
			{
			    "label": "forenames:",
			    "name": "forenames"
			},
			{
			    "label": "surname:",
			    "name": "surname"
			},
			{
			    "label": "date_of_birth:",
			    "name": "date_of_birth",
			    "type": 'datetime',
			    "def": function () { return new Date(); },
			    "format": 'D/M/YYYY',
			    "fieldInfo": 'US style m/d/y format'
			},
			{
			    "label": "telephone:",
			    "name": "telephone"
			},
			{
			    "label": "mobile:",
			    "name": "mobile"
			},
			{
			    "label": "address:",
			    "name": "address"
			},
			{
			    "label": "address_2:",
			    "name": "address_2"
			},
			{
			    "label": "post_code:",
			    "name": "post_code"
			},
			{
			    "label": "email_home:",
			    "name": "email_home"
			},
			{
			    "label": "start_date:",
			    "name": "start_date",
			    "type": 'datetime',
			    "def": function () { return new Date(); },
			    "format": 'D/M/YYYY',
			    "fieldInfo": 'US style m/d/y format'
			}
        ]
    });

    editor.on('preSubmit', function (e, o, action) {
        if (action !== 'remove') {
            var forenames = this.field('forenames');
            var surname = this.field('surname');
            var email_home = this.field('email_home');
            var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

            if (!forenames.isMultiValue()) {
                if (!forenames.val()) {
                    forenames.error('A forenames must be given');
                }
            }

            if (!surname.isMultiValue()) {
                if (!surname.val()) {
                    surname.error('A surname must be given');
                }
            }

            if (this.inError()) {
                return false;
            }
        }
    });

    var table = $('#personnelRecords').DataTable({
        dom: 'Bfrtip',
        ajax: 'PersonnelRecords/GetAllPersonnelRecords',
        idSrc: "id",
        columns: [
            {
                "data": "payroll_number"
            },
			{
			    "data": "forenames"
			},
			{
			    "data": "surname"
			},
			{
			    "data": "date_of_birth"
			},
			{
			    "data": "telephone"
			},
			{
			    "data": "mobile"
			},
			{
			    "data": "address"
			},
			{
			    "data": "address_2"
			},
			{
			    "data": "post_code"
			},
			{
			    "data": "email_home"
			},
			{
			    "data": "start_date"
			}
        ],
        select: true,
        lengthChange: true,
        buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit', editor: editor },
			{ extend: 'remove', editor: editor }
        ]
    });

    /*var table = $("#personnelRecords").DataTable({
        "ajax": {
            "url": "PersonnelRecords/GetAllPersonnelRecords",
            "type": "GET",
            "datatype": "json",
        },
        "columns": [
                    { "data": "payroll_number", "autowidth": true },
                    { "data": "forenames", "autowidth": true },
                    { "data": "surname", "autowidth": true },
                    { "data": "date_of_birth", "autowidth": true },
                    { "data": "telephone", "autowidth": true },
                    { "data": "mobile", "autowidth": true },
                    { "data": "address", "autowidth": true },
                    { "data": "address_2", "autowidth": true },
                    { "data": "post_code", "autowidth": true },
                    { "data": "email_home", "autowidth": true },
                    { "data": "start_date", "autowidth": true }

        ]
    });*/


    $('#inputGroupFileAddon04').click(function () {
  
        // Checking whether FormData is available in browser  
        if (window.FormData !== undefined) {  
  
            var fileUpload = $("#inputGroupFile04").get(0);
            var files = fileUpload.files;  
              
            // Create FormData object  
            var fileData = new FormData();  
  
            // Looping over all files and add it to FormData object  
            for (var i = 0; i < files.length; i++) {  
                fileData.append(files[i].name, files[i]);  
            }  
              
            // Adding one more key to FormData object  
            //fileData.append('username', ‘Manas’);  
  
            $.ajax({  
                url: 'UploadFile/UploadFiles',  
                type: "POST",  
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: fileData,  
                success: function (result) {  
                    alert(result);
                    table.ajax.reload(null, false);
                },  
                error: function (err) {  
                    alert(err.statusText);  
                }  
            });  
        } else {  
            alert("FormData is not supported.");  
        }
    });

    

});

function emailIsValid(email) {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
}

$('.custom-file input').change(function (e) {
    var files = [];
    for (var i = 0; i < $(this)[0].files.length; i++) {
        files.push($(this)[0].files[i].name);
    }
    $(this).next('.custom-file-label').html(files.join(', '));
});