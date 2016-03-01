<html>
<head>
	<meta charset="UTF-8">
	<title>Homework 5</title>
	<link rel="stylesheet" href="hw5-style.css">
</head>
<body>
	<h3>The World's Slickest Database</h3>
	<p class="subtitle">Created by Database Admin Josiah Campbell</p>
	<?php
		$firstName = $_GET['firstName'];
		$lastName = $_GET['lastName'];
		$phone = $_GET['phone'];
		$age = $_GET['age'];
		require 'hw5.inc';
		addFriend($firstName, $lastName, $phone, $age);
	?>
        <p>Thank you. <?php echo "{$firstName} {$lastName}" ?> 
                has been added to the database.</p>
	<p><a href="hw5.html">Go home</a></p>
</body>
</html>
