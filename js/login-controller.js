// controller for user login pages
app.controller('loginFormController', ['$scope', '$http', '$state', 'ngDialog', 'userAccountService',
  function($scope, $http, $state, ngDialog, userAccountService) {

/*    $scope.formData = {};    
    $scope.translation = {};*/
    $scope.loginForm = {};   

    $scope.validateLogIn = function(){

      var password = $scope.loginForm.password;
      var username = $scope.loginForm.username;

      $http({
      method  : 'POST',
      url     : 'php/validate_user.php',
      data    : 
        "Username=" + username +
        "&Password=" + Sha1.hash(password)
      ,  
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      }).success(function(data) {
        if(data.status == "failed"){
          console.log("Wrong username/password");
          alert("Wrong username/password");
        }
        else if(data.status == "success"){
          console.log("Signing in successful");
          userAccountService.addDetails(username, password, data.userType);

            // check the user type and send it to the appropriate page
            if(data.userType == 1){
              $state.go('admin.dashboard',{});
            }
            else if(data.userType == 0){
              $state.go('normal.dashboard',{});
            }
        }
      }).error(function(data, status, headers, config){
        console.log("error: " + data + " status: " + status + " headers: " + headers);
        console.log(data.msg + " Unable to post http request");
      });
    };

}]);