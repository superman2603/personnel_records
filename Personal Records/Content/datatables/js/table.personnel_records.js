
/*
 * Editor client script for DB table personnel_records
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: '/api/personnel_records',
		table: '#personnel_records',
		fields: [
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
				"name": "date_of_birth"
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
				"name": "start_date"
			}
		]
	} );

	var table = $('#personnel_records').DataTable( {
		dom: 'Bfrtip',
		ajax: '/api/personnel_records',
		columns: [
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
		lengthChange: false,
		buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit',   editor: editor },
			{ extend: 'remove', editor: editor }
		]
	} );
} );

}(jQuery));

