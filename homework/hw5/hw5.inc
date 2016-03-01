<?php

  function createTables(){
    // a function to create a table called friends that
    // will have an id number (int auto-increment),
    // name (string), phone (string) and age(int).
    $con = openCon();
    $sql = "CREATE TABLE friends(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, firstName CHAR(24), lastName CHAR(24), phone CHAR(12), age INT);";
    mysql_query($sql);
    closeCon($con);
  }

  function splitFile() {
    // a function to read in a text file and
    // populate the table with the data in the file
    $file = fopen("friends.txt","r");
    while(!feof($file)) {
        $friend = explode(",", fgets($file), 4);
        if (!empty($friend[0])) {
            $friend[3] = intval(trim($friend[3]));
            addFriend($friend[0], $friend[1], $friend[2], $friend[3]);
        }
    }
    fclose($file);
  }

  function addFriend($firstName, $lastName, $phone, $age) {
    $con = openCon();
    $sql="INSERT INTO friends(firstName, lastName, phone, age) values (\"{$firstName}\", \"{$lastName}\", \"{$phone}\", {$age});";
    if(mysql_query($sql))
      $newId = mysql_insert_id();
    closeCon($con);
    return $newId;
  }

  function getFriendTable(){
    // a function to read through the table and display
    // the friends in an html table (include all fields - even id)
		$con = openCon();
		$sql="SELECT * FROM friends;";
		$result = mysql_query($sql);
		$data = "<table><th>ID</th><th>First name</th><th>Last name</th><th>Phone</th><th>Age</th>";
		while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			$data.="<tr><td>".$row['id']."</td><td>".$row['firstName']."</td><td>".$row['lastName']."</td><td>".$row['phone']."</td><td>".$row['age']."</td></tr>";
    }
    $data.="</table>";
		closeCon($con);
		return $data;
	}

  function openCon(){
    $con = mysql_connect("cis.gvsu.edu", "campbell", "campbell8063");
    if (!$con){
      die('Could not connect: '.mysql_error());
    }
    mysql_select_db("campbell", $con);
    return $con;
  }

  function closeCon($con){
    mysql_close($con);
  }
?>
