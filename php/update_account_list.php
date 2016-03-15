<?php
/*$myServer = "192.185.4.104";
$myUser = "childfir_54kota";
$myPass = "childfirst_kota";
$myDB = "childfir_riskform";*/

/*localhost database login*/
$myServer = "localhost";
$myUser = "root";
$myPass = "";
$myDB = "_userlogin";

/* response array to echo back to js */
$response = array();
$result_row = array();

//connection to database
$mysqli=mysqli_connect($myServer,$myUser,$myPass,$myDB) 
	or die ("Could not connect to _userlogin database" . mysql_error());

if(!$mysqli)
	$response['msg'] = "Could not connect to _userlogin server\n";
else
	$response['msg'] = "Connected to _userlogin db\n";

$query = "SELECT * FROM login";
$result = mysqli_query($mysqli,$query);
$num_row = mysqli_num_rows($result);

// fetch all rows from the table
while($row = mysqli_fetch_row($result)){
	$result_row[] = $row;
}

echo json_encode($result_row);

mysqli_close($mysqli);

?>