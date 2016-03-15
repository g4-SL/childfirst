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

/* response array to echo back to js */
$response = array();

//connection to database
$mysqli=mysqli_connect($myServer,$myUser,$myPass,$myDB) 
	or die ("Could not connect to _userlogin database" . mysql_error());

if(!$mysqli)
	$response['msg'] = "Could not connect to _userlogin server\n";
else
	$response['msg'] = "Connected to _userlogin db\n";

$query = "SELECT * FROM login WHERE username='$username' AND password='$password'";
$result = mysqli_query($mysqli,$query);
$num_row = mysqli_num_rows($result);
$row = mysqli_fetch_array($result);

$response['userType'] = $row[2];
$response['password'] = $row[1];
$response['username'] = $row[0];
$response['num_rows'] = $num_row;

header('Content-Type: application/json');

if( $num_row >=1 ) {
	$response['status'] = 'success';
    $_SESSION['user_name']=$row['username'];
}
else{
	$response['status'] = 'failed';
}

mysqli_close($mysqli);

echo json_encode($response);
?>