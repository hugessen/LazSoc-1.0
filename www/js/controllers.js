angular.module('sbess.controllers', ['sbess.services'])

.controller('MainCtrl', ['$scope', 'WebAPI', '$ionicModal', '$timeout',function($scope, WebAPI, $ionicModal, $timeout) {

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
  
  //Clubs
  $scope.clubs = WebAPI.getAllClubs();
  
  //Creating the newsfeed
  $scope.events = WebAPI.getAllEvents();
}]);
