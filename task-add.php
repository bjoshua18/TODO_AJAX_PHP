<?php

	include('database.php');

	if(isset($_POST['name'])) {
		// Guardo los atributos de las tareas
		$name = $_POST['name'];
		$description = $_POST['description'];
		// Creo la consulta para la base de datos
		$query = "INSERT INTO tasks (`name`, `description`) VALUES ('$name', '$description')";
		// Hago dicha consulta con la conexión que existe en 'database.php' y lo guardo
		$result = mysqli_query($connection, $query);
		// Si el resultado está vacío, acaba con la conexión
		if(!$result) {
			die('Query Failed =(');
		}
		// Devolvemos una respuesta del server
		echo 'Task Added Successfully';
	}

?>