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
		require 'hw5.inc';
		createTable();
		echo getFriendTable();
	?>
	<p><a href="hw5.html">Go home</a></p>
</body>
</html>
