/*
service.js
Author: Capstone Child First Group 54
        Sarah Louise Leong
Last Updated: 10 March 2015
Description: service function for angularjs module
              a service to handle the communication between the controller and JSON file
              for string translation
*/


app.service('translationService', function($resource) {  

/*    this.getTranslation = function($scope, language) {
        var languageFilePath = 'json/translation/translation_' + language + '.json';
        console.log(languageFilePath);
        $resource(languageFilePath).get(function (data) {
        	console.log(data);
            $scope.translation = data;
        });
    };*/

    var translatedData = {};

    this.getTranslation = function(language) {

        var defer = $.Deferred();
        var languageFilePath = 'json/translation/translation_' + language + '.json';
        
        console.log(languageFilePath);
        $resource(languageFilePath).get(function (data) {
            translatedData = data;
            console.log(translatedData);
            defer.resolve(data);
        });

        return defer.promise();
    };

    this.getData = function(){
        console.log(translatedData);
        return translatedData;
    }

});

app.service('userAccountService', function() {
    var accountDetails = [];

    this.addDetails = function(username, password, userType) {
        console.log("adding details");
        accountDetails.push(username);
        accountDetails.push(password);
        accountDetails.push(userType);
    };

    this.getAccountDetails = function(){
      return accountDetails;
    };

});