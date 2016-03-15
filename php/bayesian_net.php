<?php 

/*$mainOffenderBayes = $_POST['mainOffenderBayes'];
$mainAbuseTypeBayes = $_POST['mainAbuseTypeBayes'];*/

$response = array();

//exec("java -jar ../jar/bayes.jar $mainOffenderBayes $mainAbuseTypeBayes", $output);
//popen("java -jar ../jar/bayes.jar $mainOffenderBayes $mainAbuseTypeBayes", "r");

$count = 0;
$handle = popen("java -jar ../jar/bayes.jar Father Sexual", "r");
sleep(20);
while(!feof($handle)){
	$read = fgets($handle, 8192);
	//flush();
	echo "$count\n";
	$count = $count + 1;
	echo json_encode($read);
	//sleep(15);
}

/*while (($read = fgets($handle, 8192)) != false) {
	//flush();
	echo "$count\n";
	$count = $count + 1;
	echo json_encode($read);
}
if (!feof($handle)) {
    echo "Error: unexpected fgets() fail\n";
}*/

echo "done";
//echo $read;
pclose($handle);


/*$response['offender'] = $mainOffenderBayes;
$response['abuse'] = $mainAbuseTypeBayes;
$response['output'] = $output;
*/

//echo json_encode($output);

?>