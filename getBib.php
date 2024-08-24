<?php

header("Access-Control-Allow-Origin: *");

class MyDB extends SQLite3 {
  function __construct() {
	 $this->open('avBib.db');
  }
}

$ref = $_GET['ref'];
//echo $ref . '\n';

// Adds wildcard % to sql for whole chapter 
if (substr($ref, -1) == ':') {
	$ref .= '%';
}

if ($ref) {
	$db = new MyDB();
	
	$vsList = array();
	$sql = "SELECT verse FROM bible WHERE ref LIKE '{$ref}'";
	$result = $db->query($sql);
	
	while($row = $result->fetchArray(SQLITE3_ASSOC) ) {
		array_push($vsList, $row['verse']);
		#echo $row['verse'];
	}
	
	$db->close();  
	echo implode('', $vsList);
	
};
?>