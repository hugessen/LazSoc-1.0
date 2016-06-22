angular.module('sbess.controllers', ['ionic','sbess.services','ngCordova','sbess.utils'])

.controller('MainCtrl', ['$scope', '$location','$stateParams','WebAPI', '$ionicModal', '$timeout','$cordovaCalendar','$ionicPopup','$localstorage','$http', function($scope, $location, $stateParams, WebAPI, $ionicModal, $timeout,$cordovaCalendar,$ionicPopup,$localstorage,$http) {
 
/*
* Login Modal
* Checks if the user has registered. If not, prompts them for their name and student ID.
*/
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
 
 //API Result
 $scope.APIresult = "";
  $http.get('http://hari.sbess.ca/api/eventsapi/get_lazsoc_events/')
    .success(function(data, status, headers,config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.APIresult = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = APIresult.data;
    });
 
/*
* Clubs
* This section pulls all the clubs from the API, and provides functionality to add it as a preferred club
*/
  $scope.clubs = WebAPI.getAllClubs();
  $scope.toggle = function(id){
    for(var x = 0; x < $scope.clubs.length; x++) {
      if($scope.clubs[x].id == id) {
        $scope.clubs[x].selected = ! $scope.clubs[x].selected; 
      }
    }
  }
  
  $scope.currClub = WebAPI.getClub($stateParams.clubId);
  
  //The app accesses the club description pages through URL routing. We do that here
  $scope.navigateToClub = function(clubID){
    $location.path("/app/clubs/"+clubID);
  }  
 
  
  
/*
* Newsfeed
* Here we determine which events will populate our newsfeed based on the user's interests. 
* Allows the user to refresh by pulling down
*/

  $scope.reloadFeed = function() {
    $scope.customFeed = WebAPI.getCustomFeed(); //A big, long function that determines which events to show
  }
  $scope.reloadFeed();
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     // handle event
     if (data.stateId == 'app.newsfeed') {
        $scope.reloadFeed();
     }
  });  
  $scope.events = WebAPI.getAllEvents();
  $scope.doRefresh = function() {
    $scope.reloadFeed();
    setTimeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
        $scope.customFeed = WebAPI.getCustomFeed();
      
    }, 1000);
  };

  
/*
* Events
* App accesses events through URL routing. Gives functionality to add events and their info to calendar through Cordova
*/
  $scope.loadEvent = function(id){
    $location.path("/app/news/" + id);
  }
  $scope.currEvent = WebAPI.getEvent($stateParams.eventId);
  
  //Adding events to the calendar
  $scope.addToCalendar = function() {
    var notes = $scope.currEvent.desc;
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
  
/*
* Preferences and Interest Selector
* Here we manage all the user's club and categorical preferences, save them in JSON, and use them to customize their feed
*/
  $scope.prefOptions = WebAPI.getPrefOptions(); //Returns an array of categorical preferences
  
  
  $scope.togglePrefs = function(id){
      for(var x = 0; x < $scope.prefOptions.length; x++) {
      if($scope.prefOptions[x].id == id) {
        $scope.prefOptions[x].selected = ! $scope.prefOptions[x].selected; 
      }
    }
  }
  $scope.debug = function(){
      $ionicPopup.alert({
          title:"Debugging!",
      });
  }
  //Activated when user presses Save. Commits all preferences and stores them in JSON
  $scope.savePrefs = function(prefType){
    if (prefType == "clubs"){ // If we're on the club selector
      $localstorage.setObject('sbess-app-clubPrefs', $scope.clubs);
      $scope.customFeed = WebAPI.getCustomFeed();
      console.log("Saving clubs");
    }
    else if (prefType =="categories"){ //If we're on the category selector
      $localstorage.setObject('sbess-app-prefs', $scope.prefOptions);
      console.log("Saving preferences");
      //console.log($scope.prefOptions);
    }
    else if (prefType =="categories"){ //If we're on the category selector
      $localstorage.setObject('sbess-app-prefs', $scope.prefOptions);
    }
    $ionicPopup.alert({
     title: 'Preferences Updated',
   });
  }
  
}])


.controller('cssCtrl', ['$scope',function($scope){
  $scope.customCss.push(
    { href : 'css/ionic.app.css', type: 'text/css' },
    { href : 'css/style.css', type : 'text/css' });
    if(ionic.Platform.isAndroid()) {
      $scope.customCss.push({ href : 'css/android.css', type : 'text/css' });
    }
}])