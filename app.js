$(document).ready(() => {

	let edit = false
	$('#task-result').hide()

	// Esta función se ejecuta en cuanto inicia la app
	fetchTasks();

	// Esta función se ejecuta cuando el usuario teclea en el buscador
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

	// Esta función se ejecuta cuando el usuario envía el formulario
	$('#task-form').submit(e => {
		const postData = {
			name: $('#name').val(),
			description: $('#description').val(),
			id: $('#taskId').val()
		}

		// Si no estamos editando, la url será 'task-add.php', si no, será 'task-edit.php'
		let url = !edit ? 'task-add.php' : 'task-edit.php'

		// Podemos usar el método ajax para enviar los datos del task
		// Pero lo haremos con el método post porque es más corto
		$.post(url, postData, response => {
			console.log(response)
			// Obtenemos la lista de tareas
			fetchTasks()
			// Ya no estamos editando
			edit = false
			// Reseteamos el formulario
			$('#task-form').trigger('reset')
		})

		e.preventDefault()
	})


	function fetchTasks() {
		$.ajax({
			url: 'task-list.php',
			type: 'GET',
			success: response => {
				let tasks = JSON.parse(response)
				let template = ''
				tasks.forEach(task => {
					template += `
					<tr taskId="${task.id}">
						<td><a href="#" class="task-item">${task.name}</a></td>
						<td>${task.description}</td>
						<td><button class="task-delete btn btn-danger">Delete</button></td>
					</tr>`;
				});
				$('#tasks').html(template)
			}
		});
	}

	$(document).on('click', '.task-delete', (e) => {
		if(confirm('Are you sure you want to delete it?')) {
			let element = e.target.parentElement.parentElement
			let id = $(element).attr('taskId')
			$.post('task-delete.php', {id}, response => {fetchTasks()})
		}
	})

	$(document).on('click', '.task-item', (e) => {
		let element = e.target.parentElement.parentElement
		let id = $(element).attr('taskId')
		$.post('task-single.php', {id}, response => {
			const task = JSON.parse(response)
			$('#name').val(task.name)
			$('#description').val(task.description)
			$('#taskId').val(task.id)
			edit = true
		})
	})
})