angular.module('sbess.controllers', ['sbess.services'])

.controller('MainCtrl', ['$scope', 'WebAPI', '$ionicModal', '$timeout',function($scope, WebAPI, $ionicModal, $timeout) {

  
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
  $scope.clubs = WebAPI.getAllClubs();
}])

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
