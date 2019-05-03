$(document).ready(() => {
	$('#search').keyup(() => {
		let search = $('#search').val()
		// Este método nos permite hacer una peticón al servidor
		$.ajax({ // El objeto que le enviamos está compuesto por...
			url: 'task-search.php', // Una url al archivo al que hacemos la petición
			type: 'POST', // El tipo de método de envío
			data: {search}, // Los datos que le pasamos
			success: response => {console.log(response)} // La función que se ejecuta una vez llegue la respuesta del servidor
		})
	})
})