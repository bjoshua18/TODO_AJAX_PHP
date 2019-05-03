<?php

	include('database.php');

	$search = $_POST['search'];

	if(!empty($search)) {
		// Creo la consulta para la base de datos
		$query = "SELECT * FROM tasks WHERE `name` LIKE '$search%'";
		// Hago dicha consulta con la conexión que existe en 'database.php' y lo guardo
		$result = mysqli_query($connection, $query);

		// Si el resultado está vacío, acaba con la conexión
		if(!$result) {
			die('Query Error =('. mysqli_error($connection));
		}

		// Los datos los enviará en un json
		$json = array();
		// Recorremos el array resultado y lo convertimos en un json
		while ($row = mysqli_fetch_array($result)) {
			$json[] = array(
				'name' => $row['name'],
				'description' => $row['description'],
				'id' => $row['id']
			);
		}

		$jsonstring = json_encode($json);
		echo $jsonstring;
	}

?>