angular.module('sbess.controllers', ['ionic','sbess.services'])

.controller('MainCtrl', ['$scope', '$location','$stateParams','WebAPI', '$ionicModal', '$timeout', function($scope, $location, $stateParams, WebAPI, $ionicModal, $timeout) {

  //Setting up the Modal
  $ionicModal.fromTemplateUrl('templates/userinfo.html', {
    scope:$scope,
    animation: 'slide-in-up'   
    
  }) 
  .then(function(modal) {
    $scope.userInfoModal = modal;
  })
  
  $scope.openModal = function() {
    $scope.userInfoModal.show();
  }
  $scope.closeModal = function() {
    $scope.userInfoModal.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.userInfoModal.remove();
  });
  $scope.richard = "Richard";
  
  //Clubs
  $scope.clubs = WebAPI.getAllClubs();
  $scope.toggle = function(id){
    for(var x = 0; x < $scope.clubs.length; x++) {
      if($scope.clubs[x].id == id) {
        $scope.clubs[x].selected = ! $scope.clubs[x].selected; 
      }
    }
  }
  
  //Creating the newsfeed
  $scope.events = WebAPI.getAllEvents();
  $scope.doRefresh = function() {
    setTimeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };
  
  //Opening an event
  $scope.loadEvent = function(id){
    $location.path("/app/news/" + id);
  }
  $scope.currEvent = WebAPI.getEvent($stateParams.eventId);
  
  
}])
.controller('cssCtrl', ['$scope',function($scope){
  $scope.customCss.push(
    { href : 'css/ionic.app.css', type: 'text/css' },
    { href : 'css/style.css', type : 'text/css' });
    if(ionic.Platform.isAndroid()) {
      $scope.customCss.push({ href : 'css/android.css', type : 'text/css' });
    }
}]);
