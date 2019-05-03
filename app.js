$(document).ready(() => {

	$('#task-result').hide()

	// Este método se ejecuta cuando el usuario teclea en el buscador
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

	// Este método se ejecuta cuando el usuario envía el formulario
	$('#task-form').submit(e => {
		const postData = {
			name: $('#name').val(),
			description: $('#description').val()
		}

		// Podemos usar el método ajax para enviar los datos del task
		// Pero lo haremos con el método post porque es más corto
		$.post('task-add.php', postData, response => {
			console.log(response);
			// Reseteamos el formulario
			$('#task-form').trigger('reset')
		})

		e.preventDefault();
	})

	// Este se ejecuta en cuanto inicia la app
	$.ajax({
		url: 'task-list.php',
		type: 'GET',
		success: response => {console.log(response)}
	})
})