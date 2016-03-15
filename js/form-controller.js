/*
fomr-controller.js
Author: Capstone Child First Group 54
        Sarah Louise Leong
Last Updated: 10 March 2015
Description: controller aspect of the project
              contains function to post data to remote database and translate string
              given chosen language
*/


app.controller('formController', ['$scope', '$http', '$state', 'translationService', 
  function($scope, $http, $state, translationService) {
        
    /*initialize all parameters*/
    // we will store all of our form data in this object
    $scope.formData = $scope.formData || {};    
    $scope.translation = $scope.translation || {};

    // helper method
    // convert main offender number to a string title
    var convertToOffenderTitle = function(title){
      if(title == 1 || title == 2)
        return "Father";
      else if(title == 3 || title == 4)
        return "Mother";
      else if(title == 5)
        return "Other";
    };

    // convert main abuse type number to a string title
    var convertToAbuseTypeTitle = function(title){
      if(title == 1)
        return "Physical";
      else if(title == 2)
        return "Sexual";
      else if(title == 3)
        return "Neglect";
      else if(title == 4)
        return "Emotional";
    };

    // function to process the form
    $scope.processForm = function() {

      /*getting date input and converting it to Date*/
      var mandatoryReport   = new Date($scope.formData.date_mandatoryReport);
      var emergencyMeeting  = new Date($scope.formData.date_emergencyMeeting);
      var childCustody      = new Date($scope.formData.date_childCustody);
      var emergencyOutreach = new Date($scope.formData.date_emergencyOutreach);
      var childSafety       = new Date($scope.formData.date_childSafety);
      var childProtection   = new Date($scope.formData.date_childProtection);
      var childBirthday     = new Date($scope.formData.date_childBirthday);

      // setting main offender others field
      // if others option not selected, set it to null
      // otherwise, get the string from the form
      var mainOffOthersInput = $scope.formData.mainOffender;
      if(mainOffOthersInput == 5)
        mainOffOthersInput = $scope.formData.mainOffenderOthers;
      else
        mainOffOthersInput = null;

      // if gender is switched to male, set value to 1
      // if sibling is switched to yes, set value to 1
      var genderStr;
      var siblingStr;
      if($scope.formData.gender)
        genderStr = 1;

      if($scope.formData.sibling)
        siblingStr = 1;


      /* ----------------------------------------------

      sending risk assessment sheet to db

      ------------------------------------------------- */

/*      $http({
      method  : 'POST',
      url     : 'php/submitform_shorter.php',
      data    : 
        "CaseID=" + "1254787" +
        "&ChildID=" + "9876543421" +
        "&source=" + $scope.formData.reportFrom +   
        
        // date input  
        "&date_year=" + mandatoryReport.getUTCFullYear() +
        "&mandatoryReportMonth=" + (mandatoryReport.getUTCMonth()+1) + 
        "&mandatoryReportDay=" + mandatoryReport.getUTCDate() +
        "&mandatoryReportHour=" + mandatoryReport.getUTCHours() + 
        "&mandatoryReportMinute=" + mandatoryReport.getUTCMinutes() + 
        "&emergencyMeetingMonth=" + (emergencyMeeting.getUTCMonth()+1) + 
        "&emergencyMeetingDay=" + emergencyMeeting.getUTCDate() +
        "&emergencyMeetingHour=" + emergencyMeeting.getUTCHours() + 
        "&emergencyMeetingMinute=" + emergencyMeeting.getUTCMinutes() +
        "&childCustodyMonth=" + (childCustody.getUTCMonth()+1) + 
        "&childCustodyDay=" + childCustody.getUTCDate() +
        "&childCustodyHour=" + childCustody.getUTCHours() + 
        "&childCustodyMinute=" + childCustody.getUTCMinutes() +
        "&emergencyOutreachMonth=" + (emergencyOutreach.getUTCMonth()+1) + 
        "&emergencyOutreachDay=" + emergencyOutreach.getUTCDate() +
        "&emergencyOutreachHour=" + emergencyOutreach.getUTCHours() + 
        "&emergencyOutreachMinute=" + emergencyOutreach.getUTCMinutes() + 
        "&childSafetyMonth=" + (childSafety.getUTCMonth()+1) + 
        "&childSafetyDay=" + childSafety.getUTCDate() +
        "&childSafetyHour=" + childSafety.getUTCHours() + 
        "&childSafetyMinute=" + childSafety.getUTCMinutes() +
        "&childProtectionMonth=" + (childProtection.getUTCMonth()+1) + 
        "&childProtectionDay=" + childProtection.getUTCDate() +
        "&childProtectionHour=" + childProtection.getUTCHours() + 
        "&childProtectionMinute=" + childProtection.getUTCMinutes() +

        // child information input
        "&Sibling=" + $scope.formData.childName +
        "&ChildID=" + $scope.formData.childName +
        "&Gender=" + genderStr +
        "&Sibling=" + siblingStr +
        "&Birth_Year=" + childBirthday.getUTCFullYear() +
        "&Birth_Month=" + (childBirthday.getUTCMonth()+1) +
        "&Birth_Day=" + childBirthday.getUTCDate() +
        "&Birth_Age=" + (new Date().getUTCFullYear() - childBirthday.getUTCFullYear()) +
        "&ChildCustodyDecision=" + $scope.formData.childCustodyDecision +

        // new radio button for state, main abuser and main abuse type 
        "&mainOffender=" + $scope.formData.mainOffender +
        "&Other=" + mainOffOthersInput +
        "&mainAbuseType=" + $scope.formData.mainAbuseType +
        "&State=" + $scope.formData.state +

        // emergency outreach items
        "&A=" + $scope.formData.A +
        "&B=" + $scope.formData.B +
        "&C=" + $scope.formData.C +
        "&D=" + $scope.formData.D +
        "&E=" + $scope.formData.E +
        "&F=" + $scope.formData.F +

        // child custody items
        "&Child_condition1=" + $scope.formData.Child_condition1 +
        "&Child_condition2=" + $scope.formData.Child_condition2 +
        "&Child_condition3=" + $scope.formData.Child_condition3 +
        "&Environmental_factors1=" + $scope.formData.Environmental_factors1 +
        "&Environmental_factors2=" + $scope.formData.Environmental_factors2 +
        "&Environmental_factors3=" + $scope.formData.Environmental_factors3 +
        "&Parents_factor1=" + $scope.formData.Parents_factor1 +
        "&Parents_factor2=" + $scope.formData.Parents_factor2 +
        "&Parents_factor3=" + $scope.formData.Parents_factor3 +
        "&Symptom1=" + $scope.formData.Symptom1 +
        "&Symptom2=" + $scope.formData.Symptom2 +
        "&Symptom3=" + $scope.formData.Symptom3 +
        "&Symptom4=" + $scope.formData.Symptom4 +
        "&Other1=" + $scope.formData.Other1 +
        "&Other2=" + $scope.formData.Other2 
        ,  
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      }).success(function(data) {
        console.log("success: " + data);
        $scope.formData = data;
      }).error(function(data, status, headers, config){
        console.log("error: " + data + " status: " + status + " headers: " + headers);
        $scope.formData = data;
      });*/


      /* ----------------------------------------------

      bayesian network usage

      ------------------------------------------------- */

      $http({
      method  : 'POST',
      url     : 'php/bayesian_net.php',
      data    : 

        // emergency outreach items
        "mainOffenderBayes=" + convertToOffenderTitle($scope.formData.mainOffender) +
        "&mainAbuseTypeBayes=" + convertToAbuseTypeTitle($scope.formData.mainAbuseType)
      ,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      }).success(function(data) {
        //console.log("success: " + data);
        alert(data);
        $scope.formData = data;
        console.log("output something" + data);
      }).error(function(data, status, headers, config){
        console.log("error: " + data + " status: " + status + " headers: " + headers);
        $scope.formData = data;
      });

    };

    // function to translate strings given the chosen language
    $scope.translate = function(){
      //translationService.getTranslation($scope, $scope.formData.selectedLanguage);
      translationService.getTranslation($scope.formData.selectedLanguage).then(function(data){
        console.log(data);
        $scope.translation.lan = data;
      });

    };

    $scope.init = function(){
      $scope.formData.selectedLanguage = "en";
      $scope.translate();
    }

    // initializing default language as English at the startup of the page
    //$scope.formData.selectedLanguage = "en";
    //$scope.translate();

}]);