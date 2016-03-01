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
        if ($_COOKIE["uploaded"] != 1) {
            splitFile();
	        echo "<p>The data has been uploaded from your file.</p>";
            setcookie("uploaded", 1);
        } else {
            echo "<p>Data has already been uploaded.</p>";
        }
	?>
	<p><a href="hw5.html">Go home</a></p>
</body>
</html>
