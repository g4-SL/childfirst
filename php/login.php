<?php
$myServer = "localhost";
$myUser = "root";
$myPass = "";
$myDB = "_userlogin";
$username = $_POST['name'];
$password = $_POST['pwd'];

//connection to database
$mysqli=mysqli_connect($myServer,$myUser,$myPass,$myDB) 
	or die ("Could not connect to database" . mysql_error());

/*$selectDB = mysql_select_db($myDB)
	or die ("Could not open the database" . mysql_error());
*/
$query = "SELECT * FROM login WHERE username='$username' AND password='$password'";
$result = mysqli_query($mysqli,$query);
$num_row = mysqli_num_rows($result);
$row=mysqli_fetch_array($result);
if( $num_row >=1 ) {
    echo TRUE;
    $_SESSION['user_name']=$row['username'];
}
else{
    echo FALSE;
}

if(!$mysqli){
	echo "Could not connect to server\n";
}

/*if(!$selectDB){
	echo "Could not select database\n";
}*/

mysqli_close($mysqli);
?>

