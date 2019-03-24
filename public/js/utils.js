// your module
angular.module('AmericanLyceum').config(function ($validationProvider) {

      var http = angular.injector(['ng']).get('$http');

      $validationProvider.setValidMethod('blur')


      // Setup `custom` validation
      $validationProvider
          .setExpression({
              checkEmail: function (value, scope, element, attrs) {
                  return http.post("/verifyEmail",{email: value}).then(function(){
                    return true;
                  });
              },
              verifyProfileName : function (value, scope, element, attrs) {
                  if(scope.rowIndex!=null)
                    return true;
                  return http.post("/profiles/exists/"+value).then(function(){
                    return true;
                  });
              },
              branch : function (value, scope, element, attrs) {
                  if(scope.rowIndex!=null)
                    return true;
                  return http.post("/branch/exists/"+value).then(function(){
                    return true;
                  });
              },
              year : function (value, scope, element, attrs) {
                  if(scope.rowIndex!=null)
                    return true;
                  return http.post("/years/exists/"+value).then(function(){
                    return true;
                  });
              }
          })
          .setDefaultMsg({
              checkEmail: {
                  error: 'This email already is already in use.',
                  success: ''
              },
              verifyProfileName: {
                  error: 'This profile already exists',
                  success: ''
              },
              branch : {
                  error: 'Branch already exists.',
                  success: ''
              },
              year : {
                  error: 'year already exists.',
                  success: ''
              }
          });





    });
