app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'templates/admin-loginform.html',
            controller: 'loginFormController'
        })

        // Parent page for admin home dashboard
        .state('admin', {
            url: '/admin',
            templateUrl: 'templates/admin-pageContainer.html', 
            controller: 'adminUserController'
        })
        
        // Nested view of content in the parent page
        .state('admin.dashboard', {
            url: '/',
            views: {
                'content': { template: '<h1>Welcome to Child First Application</h1>\<p>Child First Application is built as a reporting system that provides an easy access to report child abuse cases and to catalog them in an orderly manner. The application also calculates the similarity of each individual case to past cases in our database and outputs the probability of re-occurence and severity of the case based on the calculated similarity</p>' },
                'header': { template: '<h2>Home</h2>' }
            }
        })

    
        .state('admin.createAccount', {
            url: '/createAccount',
            views: {
                'content': { templateUrl: 'templates/admin-createAccount.html' },
                'header': { template: '<h2>Create Account</h2>' }
            }, 
            controller: 'adminUserController'
        })

        .state('admin.manageAccount', {
            url: '/manageAccount',
            views: {
                'content': { templateUrl: 'templates/admin-manageAccount.html' },
                'header': { template: '<h2>Manage Account</h2>' }
            }, 
            controller: 'adminUserController'
        })

        .state('admin.accountDetails', {
            url: '/accountDetails',
            views: {
                'content': { templateUrl: 'templates/user-accountDetails.html' },
                'header': { template: '<h2>Account Details</h2>' }
            }, 
            controller: 'adminUserController'
        })

        // Parent page for normal social worker home dashboard
        .state('normal', {
            url: '/normal',
            templateUrl: 'templates/user-pageContainer.html', 
            controller: 'normalUserController'
        })

        .state('normal.dashboard', {
            url: '/',
            views: {
                'content': { template: '<h1>Welcome to Child First Application</h1>\<p>Child First Application is built as a reporting system that provides an easy access to report child abuse cases and to catalog them in an orderly manner. The application also calculates the similarity of each individual case to past cases in our database and outputs the probability of re-occurence and severity of the case based on the calculated similarity</p>' },
                'header': { template: '<h2>Home</h2>' }
            }, 
            controller: 'normalUserController'
        })

        .state('normal.accountDetails', {
            url: '/accountDetails',
            views: {
                'content': { templateUrl: 'templates/user-accountDetails.html' },
                'header': { template: '<h2>Account Details</h2>' }
            }, 
            controller: 'normalUserController'
        })

        // states related to risk assessment sheet form
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'templates/form.html',
            controller: 'formController',
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/chooseLanguage)
        .state('form.chooseLanguage', {
            url: '/chooseLanguage',
            templateUrl: 'templates/form-chooseLanguage.html',
            access: {allowAnonymous:true},
            controller: 'formController',
            parent: 'form'
        })

        // url will be /form/reportinfo
        .state('form.reportinfo', {
            url: '/reportinfo',
            templateUrl: 'templates/form-reportinfo.html',
            access: {allowAnonymous:true},
            controller: 'formController',
            parent: 'form'
        })
        
        // url will be /form/childinfo
        .state('form.childinfo', {
            url: '/childinfo',
            templateUrl: 'templates/form-childinfo.html',
            access: {allowAnonymous:true},
            controller: 'formController',
            parent: 'form'
        })
        
        // url will be /form/checklist
        .state('form.checklist', {
            url: '/checklist',
            templateUrl: 'templates/form-checklist.html',
            access: {allowAnonymous:true},
            controller: 'formController',
            parent: 'form'
        })

        // url will be /form/checkSubmission
        .state('form.checkSubmission', {
            url: '/check-submission',
            templateUrl: 'templates/form-checkSubmission.html',
            access: {allowAnonymous:false},
            controller: 'formController',
            parent: 'form'
        });


    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/login');
});