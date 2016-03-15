app.controller('adminUserController', ['$scope', '$http', '$state', 'ngDialog', 'userAccountService',
  function($scope, $http, $state, ngDialog, userAccountService) {

    $scope.admin = {};   
    $scope.admin.newUserType = 0;
    $scope.admin.editUserType = 0;
    $scope.admin.editUsername;
    var editAccDialog;

    var adminUserDetails = userAccountService.getAccountDetails();

    // helper method to convert int of type of user to string
    var convertIntToString = function(int){
      if(int == 0)
        return "Social Worker";
      else if(int == 1)
        return "Admin";
    };

    $scope.userType = convertIntToString(adminUserDetails.pop());
    $scope.password = adminUserDetails.pop();
    $scope.username = adminUserDetails.pop();

    // function to create an account on the login db
    $scope.createAccount = function(){

      $http({
      method  : 'POST',
      url     : 'php/create_account.php',
      data    : 
        "Username=" + $scope.admin.newUsername +
        "&Password=" + Sha1.hash($scope.admin.newPass) +
        "&Type=" + $scope.admin.newUserType
      ,  
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
      }).success(function(data) {
          console.log(data.status + ":" + data.statusMsg + "\n");

          if(data.status = "success")
          	alert("Successfully created the account");
          else
          	alert("Failed to create the account");

      }).error(function(data, status, headers, config){
        console.log("error: " + data + " status: " + status + " headers: " + headers);
        console.log(data.msg + " Unable to post http request");
      });

      $scope.admin.newUsername = "";
      $scope.admin.newPass = "";
      $scope.admin.newUserType = 0;

    };

    // function to update account list on the manage account page
    $scope.updateAccountList = function(){

      console.log("updating account list on manage account page\n");

      $http({
      method  : 'POST',
      url     : 'php/update_account_list.php'
      ,  
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
      }).success(function(result_row) {

          // index 0 - username
          // index 1 - password
          // index 2 - type of user

          // converting number for user type to readable string
          angular.forEach(result_row, function(account){
            account[2] = convertIntToString(account[2]);
          });

          $scope.result_row = result_row;

      }).error(function(data, status, headers, config){
          console.log("Unable to post http request\n");
      });
    };

    // function to transition to another page to edit account details
    $scope.goEditAccount = function(account){

      $scope.curr_username = account;

      editAccDialog = ngDialog.open({
        template: 'templates/admin-editAccount.html',
        scope: $scope,
        closeByDocument: "false"
      });
    };

    // function to change/edit selected account
    $scope.editAccount = function(){

      console.log("Editing or updating account details\n");

      $http({
      method  : 'POST',
      url     : 'php/edit_account.php',
      data    : 
        "Username=" + $scope.curr_username +
        "&OldPassword=" + Sha1.hash($scope.admin.oldPassword) +
        "&NewPassword=" + Sha1.hash($scope.admin.newPassword) +
        "&Type=" + $scope.admin.editUserType
      ,  
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
      }).success(function(data) {
          console.log(data.status + ":" + data.statusMsg + "\n");
      }).error(function(data, status, headers, config){
        console.log("error: " + data + " status: " + status + " headers: " + headers);
        console.log(data.msg + " Unable to post http request");
      });

      $scope.admin.oldPassword = "";
      $scope.admin.newPassword = "";

      editAccDialog.close();
    };

    // function to direct page to risk assessment sheet
    $scope.changeState = function(){
      $state.go('form.chooseLanguage', {});
    }
  	
}]);