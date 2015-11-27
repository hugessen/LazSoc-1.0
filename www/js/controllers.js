angular.module('sbess.controllers', ['sbess.services'])

.controller('MainCtrl', ['$scope', '$location','$stateParams','WebAPI', '$ionicModal', '$timeout', function($scope, $location, $stateParams, WebAPI, $ionicModal, $timeout) {

  //Setting up the Modal
  $ionicModal.fromTemplateUrl('templates/userinfo.html', {
    scope:$scope,
    animation: 'slide-in-up'   
    
  }) 
  .then(function(modal) {
    $scope.userInfoModal = modal;
  })
  
  $scope.openUserInfoModal = function() {
    $scope.userInfoModal.show();
  }
  $scope.closeUserInfoModal = function() {
    $scope.userInfoModal.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.userInfoModal.remove();
  });
  $scope.richard = "Richard";
  
  //Clubs
  $scope.clubs = WebAPI.getAllClubs();
  
  //Creating the newsfeed
  $scope.events = WebAPI.getAllEvents();
  
  //Opening an event
  $scope.loadEvent = function(id){
    $location.path("/app/news/" + id);
  }
  $scope.currEvent = WebAPI.getEvent($stateParams.eventId);
}]);
