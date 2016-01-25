angular.module('sbess.controllers', ['ionic','sbess.services','ngCordova'])

.controller('MainCtrl', ['$scope', '$location','$stateParams','WebAPI', '$ionicModal', '$timeout','$cordovaCalendar', function($scope, $location, $stateParams, WebAPI, $ionicModal, $timeout,$cordovaCalendar) {

  //Miscellaneous
  $scope.navigateToClub = function(clubID){
    $location.path("/app/clubs/"+clubID);
  }

  //Setting up the Club Modal
  $ionicModal.fromTemplateUrl('templates/clubselector.html', {
    scope:$scope,
    animation: 'slide-in-up'   
    
  }) 
  .then(function(modal) {
    $scope.clubModal = modal;
  })
  
  $scope.openModal = function() {
    $scope.clubModal.show();
  }
  $scope.closeModal = function() {
    $scope.clubModal.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.clubModal.remove();
  });
  
  //Login Modal: May not get used
  $ionicModal.fromTemplateUrl("templates/launch.html", {
    scope: $scope,
    animation: 'slide-in-up'
  })
  .then(function(modal){
    $scope.loginModal = modal;
  })
  
  $scope.openLogin = function(){
    $scope.loginModal.show();
  }
  $scope.closeLogin = function(){
    $scope.loginModal.hide();
  }
    $scope.$on('$destroy', function() {
    $scope.loginModal.remove();
  });
 
  
  //Clubs
  $scope.clubs = WebAPI.getAllClubs();
  $scope.toggle = function(id){
    for(var x = 0; x < $scope.clubs.length; x++) {
      if($scope.clubs[x].id == id) {
        $scope.clubs[x].selected = ! $scope.clubs[x].selected; 
      }
    }
  }
  
  $scope.currClub = WebAPI.getClub($stateParams.clubId);
  
  
  //Creating the newsfeed
  $scope.events = WebAPI.getAllEvents();
  $scope.doRefresh = function() {
    setTimeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };
  
  //Events
  $scope.loadEvent = function(id){
    $location.path("/app/news/" + id);
  }
  $scope.currEvent = WebAPI.getEvent($stateParams.eventId);
  
  $scope.addToCalendar = function() {
    var notes = $scope.currEvent.desc;
    
    //Calendar
    $cordovaCalendar.createEventInteractively({
      title: $scope.currEvent.title,
      location: $scope.currEvent.location,
      notes: notes,
      startDate: $scope.currEvent.startDate,
      endDate: $scope.currEvent.endDate
    }).then(function(result) {

    }, function(err) {
      alert("There was an error while trying to add " + $scope.currEvent.title + " to your calendar. Please try again!");
      // error
    });

  }
  
  //Interest Selector
  $scope.prefOptions = WebAPI.getPrefOptions();
  
}])
.controller('cssCtrl', ['$scope',function($scope){
  $scope.customCss.push(
    { href : 'css/ionic.app.css', type: 'text/css' },
    { href : 'css/style.css', type : 'text/css' });
    if(ionic.Platform.isAndroid()) {
      $scope.customCss.push({ href : 'css/android.css', type : 'text/css' });
    }
}]);
