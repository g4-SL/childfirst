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

/*username and password info*/
$username = $_POST['Username'];
$password = $_POST['Password'];
$type = $_POST['Type'];

/* response array to echo back to js */
$response = array();

//connection to database
$mysqli=mysqli_connect($myServer,$myUser,$myPass,$myDB) 
	or die ("Could not connect to _userlogin database" . mysql_error());

if(!$mysqli)
	$response['msg'] = "Could not connect to _userlogin server\n";
else
	$response['msg'] = "Connected to _userlogin db\n";


$query = "INSERT INTO login(username,password,type) VALUES (?,?,?)";
$statement = $mysqli->prepare($query);
$statement->bind_param('ssi',$username,$password,$type);

if($statement->execute()){
	$response['status'] = 'success';
	$response['statusMsg'] = "Successfully created new account for $username";
}else{
	$response['status'] = 'failed';
	$response['statusMsg'] = 'Unable to create new account';
}

mysqli_close($mysqli);

echo json_encode($response);
?>