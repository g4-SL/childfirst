app.controller('normalUserController', ['$scope', '$http', '$state', 'userAccountService',
  function($scope, $http, $state, userAccountService) {

    var normalUserDetails = userAccountService.getAccountDetails();
    
    var convertIntToString = function(int){
      if(int == 0)
        return "Social Worker";
      else if(int == 1)
        return "Admin";
    };

    $scope.userType = convertIntToString(normalUserDetails.pop());
    $scope.password = normalUserDetails.pop();
    $scope.username = normalUserDetails.pop();

    // function to direct page to risk assessment sheet
    $scope.changeState = function(){
      console.log("Changed states\n");
      $state.go('form.chooseLanguage', {});
    }
    
}]);