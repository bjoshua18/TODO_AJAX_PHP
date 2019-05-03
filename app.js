$(document).ready(() => {

	$('#task-result').hide()

	$('#search').keyup(() => {
		// Si el resultado de la búsqueda no está vacío...
		if($('#search').val()) {
			let search = $('#search').val()
			// Este método nos permite hacer una peticón al servidor
			$.ajax({ // El objeto que le enviamos está compuesto por...
				url: 'task-search.php', // Una url al archivo al que hacemos la petición
				type: 'POST', // El tipo de método de envío
				data: {search}, // Los datos que le pasamos
				success: response => { // La función que se ejecuta una vez llegue la respuesta del servidor
					let tasks = JSON.parse(response)
					let template = ''
					tasks.forEach(task => {
						template += `<li>
							${task.name}
						</li>`
					})

					$('#container').html(template)
					$('#task-result').show()
				} 
			})
		} else {
			$('#task-result').hide()
		}
	})

	$('#task-form').submit(e => {
		const postData = {
			name: $('#name').val(),
			description: $('#description').val()
		}

		// Podemos usar el método ajax para enviar los datos del task
		// Pero lo haremos con el método post porque es más corto
		$.post('task-add.php', postData, response => {
			console.log(response);
		})

		e.preventDefault();
	})
})