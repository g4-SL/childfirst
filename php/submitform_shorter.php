<?php
/*$myServer = "192.185.4.104";
$myUser = "childfir_54kota";
$myPass = "childfirst_kota";
$myDB = "childfir_riskform";*/

/*localhost database login*/
$myServer = "localhost";
$myUser = "root";
$myPass = "";
$myDB = "_riskform";

/*child information section*/
$ChildID = $_POST['ChildID'];
$CaseID = $_POST['CaseID'];
$Gender = $_POST['Gender'];
$Sibling = $_POST['Sibling'];
$Birth_Year = $_POST['Birth_Year'];
$Birth_Month = $_POST['Birth_Month'];
$Birth_Day = $_POST['Birth_Day'];
$Birth_Age = $_POST['Birth_Age'];
$ChildCustodyDecision = $_POST['ChildCustodyDecision'];

/*new radio button for state, main abuser and main abuse type */
$mainOffender = $_POST['mainOffender'];
$Other = $_POST['Other'];
$mainAbuseType = $_POST['mainAbuseType'];
$State = $_POST['State'];

/*required date and time section*/
$date_year = $_POST['date_year'];
$mandatoryReportMonth = $_POST['mandatoryReportMonth'];
$mandatoryReportDay = $_POST['mandatoryReportDay'];
$mandatoryReportHour = $_POST['mandatoryReportHour'];
$mandatoryReportMinute = $_POST['mandatoryReportMinute'];
$emergencyMeetingMonth = $_POST['emergencyMeetingMonth'];
$emergencyMeetingDay = $_POST['emergencyMeetingDay'];
$emergencyMeetingHour = $_POST['emergencyMeetingHour'];
$emergencyMeetingMinute = $_POST['emergencyMeetingMinute'];
$childCustodyMonth = $_POST['childCustodyMonth'];
$childCustodyDay = $_POST['childCustodyDay'];
$childCustodyHour = $_POST['childCustodyHour'];
$childCustodyMinute = $_POST['childCustodyMinute'];
$emergencyOutreachMonth = $_POST['emergencyOutreachMonth'];
$emergencyOutreachDay = $_POST['emergencyOutreachDay'];
$emergencyOutreachHour = $_POST['emergencyOutreachHour'];
$emergencyOutreachMinute = $_POST['emergencyOutreachMinute'];
$childSafetyMonth = $_POST['childSafetyMonth'];
$childSafetyDay = $_POST['childSafetyDay'];
$childSafetyHour = $_POST['childSafetyHour'];
$childSafetyMinute = $_POST['childSafetyMinute'];
$childProtectionMonth = $_POST['childProtectionMonth'];
$childProtectionDay = $_POST['childProtectionDay'];
$childProtectionHour = $_POST['childProtectionHour'];
$childProtectionMinute = $_POST['childProtectionMinute'];
$source = $_POST['source'];

/*emergency outreach items section*/
$A = $_POST['A'];
$B = $_POST['B'];
$C = $_POST['C'];
$D = $_POST['D'];
$E = $_POST['E'];
$F = $_POST['F'];

/*child custody section*/
$Child_condition1 = $_POST['Child_condition1'];
$Child_condition3 = $_POST['Child_condition3'];
$Child_condition2 = $_POST['Child_condition2'];
$Environmental_factors1 = $_POST['Environmental_factors1'];
$Environmental_factors2 = $_POST['Environmental_factors2'];
$Environmental_factors3 = $_POST['Environmental_factors3'];
$Parents_factor1 = $_POST['Parents_factor1'];
$Parents_factor2 = $_POST['Parents_factor2'];
$Parents_factor3 = $_POST['Parents_factor3'];
$Symptom1 = $_POST['Symptom1'];
$Symptom2 = $_POST['Symptom2'];
$Symptom3 = $_POST['Symptom3'];
$Symptom4 = $_POST['Symptom4'];
$Other1 = $_POST['Other1'];
$Other2 = $_POST['Other2'];

//connection to database
$mysqli=mysqli_connect($myServer,$myUser,$myPass,$myDB) 
	or die ("Could not connect to database" . mysql_error());

if(!$mysqli){
	echo "Could not connect to server\n";
}
else
	echo "Connected to db\n";

$date_type = 'Mandatory Report';
$query = "INSERT INTO FormDate(CaseID,ChildID,date_type,date_year,date_month,date_day,date_hour,date_min,source) VALUES (?,?,?,?,?,?,?,?,?)";
$statement = $mysqli->prepare($query);
$statement->bind_param('iisiiiiis',$CaseID,$ChildID,$date_type,$date_year,$mandatoryReportMonth,$mandatoryReportDay,$mandatoryReportHour,$mandatoryReportMinute,$source);

if($statement->execute()){
	echo "data inserted Mandatory Report date\n";
}else{
	die('Error date: ('. $mysqli->errno .') '. $mysqli->error);
}

$date_type = 'Emergency Meeting';
$statement->bind_param('iisiiiiis',$CaseID,$ChildID,$date_type,$date_year,$emergencyMeetingMonth,$emergencyMeetingDay,$emergencyMeetingHour,$emergencyMeetingMinute,$source);

if($statement->execute()){
	echo "data inserted Emergency Meeting date\n";
}else{
	die('Error date: ('. $mysqli->errno .') '. $mysqli->error);
}

$date_type = 'Child Custody';
$statement->bind_param('iisiiiiis',$CaseID,$ChildID,$date_type,$date_year,$childCustodyMonth,$childCustodyDay,$childCustodyHour,$childCustodyMinute,$source);

if($statement->execute()){
	echo "data inserted Child Custody date\n";
}else{
	die('Error date: ('. $mysqli->errno .') '. $mysqli->error);
}

$date_type = 'Emergency Outreach';
$statement->bind_param('iisiiiiis',$CaseID,$ChildID,$date_type,$date_year,$emergencyOutreachMonth,$emergencyOutreachDay,$emergencyOutreachHour,$emergencyOutreachMinute,$source);

if($statement->execute()){
	echo "data inserted Emergency Outreach date\n";
}else{
	die('Error date: ('. $mysqli->errno .') '. $mysqli->error);
}

$date_type = 'Child Safety Confirmation';
$statement->bind_param('iisiiiiis',$CaseID,$ChildID,$date_type,$date_year,$childSafetyMonth,$childSafetyDay,$childSafetyHour,$childSafetyMinute,$source);

if($statement->execute()){
	echo "data inserted Child Safety Confirmation date\n";
}else{
	die('Error date: ('. $mysqli->errno .') '. $mysqli->error);
}

$date_type = 'Child Protection';
$statement->bind_param('iisiiiiis',$CaseID,$ChildID,$date_type,$date_year,$childProtectionMonth,$childProtectionDay,$childProtectionHour,$childProtectionMinute,$source);

if($statement->execute()){
	echo "data inserted Child Protection date\n";
}else{
	die('Error date: ('. $mysqli->errno .') '. $mysqli->error);
}
$statement->close();

$query = "INSERT INTO Child(
	CaseID,
	ChildID,
	Gender,
	ChildCustodyDecision,
	Birth_year,
	Birth_month,
	Birth_day,
	birth_age,
	sibling,
	State) VALUES (?,?,?,?,?,?,?,?,?,?)";

$statement = $mysqli->prepare($query);
$statement->bind_param('iiiiiiiiii',
	$CaseID,
	$ChildID,
	$Gender,
	$ChildCustodyDecision,
	$Birth_Year,
	$Birth_Month,
	$Birth_Day,
	$Birth_Age,
	$Sibling,
	$State);
if($statement->execute()){
	echo "data inserted child\n";
}else{
	die('Error child: ('. $mysqli->errno .') '. $mysqli->error);
}
$statement->close(); 

$query = "INSERT INTO EmergencyOutreachItem(
	CaseID,
	A,
	B,
	C,
	D,
	E,
	F) VALUES (?,?,?,?,?,?,?)";
$statement = $mysqli->prepare($query);
$statement->bind_param('iiiiiii',
	$CaseID,
	$A,
	$B,
	$C,
	$D,
	$E,
	$F);

if($statement->execute()){
	echo "data inserted emergency\n" ;
}else{
	die('Error emergency: ('. $mysqli->errno .') '. $mysqli->error);
}
$statement->close();

$query = "INSERT INTO Offense(
	CaseID,
	Other,
	mainAbuseType,
	mainOffender) VALUES (?,?,?,?)";
$statement = $mysqli->prepare($query);
$statement->bind_param('isii',
	$CaseID,
	$Other,
	$mainAbuseType,
	$mainOffender);

if($statement->execute()){
	echo "data inserted offense\n";
}else{
	die('Error offense: ('. $mysqli->errno .') '. $mysqli->error);
}
$statement->close();

$query = "INSERT INTO ChildCustodyItem(
	CaseID,
	Child_condition1,
	Child_condition2,
	Child_condition3,
	Environmental_factors1,
	Environmental_factors2,
	Environmental_factors3,
	Parents_factor1,
	Parents_factor2,
	Parents_factor3,
	Symptom1,
	Symptom2,
	Symptom3,
	Symptom4,
	Other1,
	Other2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
$statement = $mysqli->prepare($query);
$statement->bind_param('iiiiiiiiiiiiiiii',
	$CaseID,
	$Child_condition1,
	$Child_condition2,
	$Child_condition3,
	$Environmental_factors1,
	$Environmental_factors2,
	$Environmental_factors3,
	$Parents_factor1,
	$Parents_factor2,
	$Parents_factor3,
	$Symptom1,
	$Symptom2,
	$Symptom3,
	$Symptom4,
	$Other1,
	$Other2);
if($statement->execute()){
	echo "data inserted child custody item\n";
}else{
	die('Error child custody item: ('. $mysqli->errno .') '. $mysqli->error);
}
$statement->close();

mysqli_close($mysqli);
?>