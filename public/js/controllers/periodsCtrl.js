angular.module('AmericanLyceum')
.controller('PeriodsCtrl',function(auth,$scope,$rootScope,$http, $window,toaster,$injector,$filter){
   
    $rootScope.user = auth.getUser();

    $scope.list = [];
    $scope.data  = {};
    $scope.rowIndex  = null;
    $scope.query = "";
    $scope.filteredList = [];
    
    var page = "Period";
    var pages = "Periods";
   
    var api = "/periods/";


    $scope.config = {
      itemsPerPage: 6,
    }

    var $validationProvider = $injector.get('$validation');



    $scope.open = function(){
      $scope.showModal = true;
      $scope.rowIndex  = null;
      $scope.data = {};
    }

    $scope.search = function(){
      $scope.filteredList = $filter("filter")($scope.list, $scope.query);
    }

    $scope.edit = function(_id,form){
      $scope.rowIndex = _id;
      $scope.data = $.extend({}, $scope.list.filter(data => data._id == _id)[0]) ;
      $scope.data.start = new Date($scope.data.start);
      $scope.data.end = new Date($scope.data.end);
      $scope.$watch("data", function() {
        console.log("**** $watch data ****");
        if(!$.isEmptyObject($scope.data))
          $validationProvider.validate(form);
       });
      $scope.showModal = true;
    }

    $scope.remove = function(_id){
      $http({method : "DELETE" , url : api + _id}).success(function(data){
        $scope.filteredList = $scope.list = $scope.list.filter(data => data._id != _id);
        $scope.rowIndex = null;
      }).error(function(){
      });
    }

    $scope.submit = function(form){

        $validationProvider.validate(form);
        if(!$validationProvider.checkValid)
          return;

       if($scope.rowIndex==null){
         //save
         $http({method : "POST" , url : api , data : $scope.data}).success(function(data){
           $scope.list.push(data);
           $scope.filteredList = $scope.list;
           $scope.showModal = false;
           toaster.pop("success","Success", page + "  is added.");
           $scope.search();
         }).error(function(){
           toaster.pop("error","Error", page + "  not added")
         });
       }else{
         //update
         $http({method : "PUT" , url : api +$scope.rowIndex, data : $scope.data}).success(function(data){
           $scope.list.forEach(function(item, i) { if (item._id  == data._id ) $scope.list[i] = $scope.data; });
           $scope.filteredList = $scope.list;
           $scope.showModal = false;
           toaster.pop("success","Success",  page + " information updated.")
         }).error(function(){
           toaster.pop("error","Error", page + " update faild")
         });
       }

    }

    $scope.reload = function(){
      $http({method : "GET" , url : api , data : $scope.data}).success(function(data){
        $scope.list = data;
        $scope.filteredList = $scope.list;
        toaster.pop("info","Information", page + " information is loaded.")
      }).error(function(){
         toaster.pop("error","Error", "Error while loading "+page+" data.");
      });
    }

    $scope.reload();

    pageEnd();
  })