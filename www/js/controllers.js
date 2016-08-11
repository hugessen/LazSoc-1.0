angular.module('sbess.controllers', ['ionic','sbess.services','ngCordova','sbess.utils'])
.controller('NavCtrl', ['$scope', '$location','$stateParams', function($scope, $location, $stateParams) {
}])

.controller('MainCtrl', ['$scope', '$location','$stateParams','WebAPI', '$ionicModal', '$timeout','$cordovaCalendar','$ionicPopup','$localstorage','$http','ConnectivityMonitor', '$ionicPlatform', '$ionicHistory', '$state', function($scope, $location, $stateParams, WebAPI, $ionicModal, $timeout,$cordovaCalendar,$ionicPopup,$localstorage,$http,ConnectivityMonitor, $ionicPlatform, $ionicHistory, $state) {
/*
* Login Modal
* Checks if the user has registered. If not, prompts them for their name and student ID.
*/
  $scope.loginData = {
    isRegistered: false,
    firstName: '',
    lastName: '',
    laurierID: ''
  };

  function isEmptyObject(obj){
    return JSON.stringify(obj) == '{}' || obj == null;
  }

  $scope.openLogin = function(){
      $ionicModal.fromTemplateUrl("templates/launch.html", {
          scope: $scope,
          animation: 'slide-in-up'
      })
      .then(function(modal){
          $scope.loginModal = modal;
          $scope.loginModal.show();
      })
  }

  $scope.checkLoginData = function() {
    if (isEmptyObject($localstorage.getObject('sbess-app-loginData'))) { 
      $scope.openLogin();
    } else {
        $scope.loginData = $localstorage.getObject('sbess-app-loginData');
    }
  }

  $scope.checkLoginData();
  
  //The initial login modal

  $scope.closeLogin = function(){
    if ($scope.loginData.firstName === '' || $scope.loginData.lastName === '' || $scope.loginData.laurierID === '') {
        $ionicPopup.alert({title: 'Please enter all fields to continue',});
    } else {
        var laurierID = $scope.loginData.laurierID;
        isValidID = laurierID.length == 21 && laurierID.substring(8) === '@mylaurier.ca' && !isNaN(laurierID.substring(4,8));
        if (isValidID){
            $scope.loginData.isRegistered = true;
            $localstorage.setObject('sbess-app-loginData', $scope.loginData);
            $scope.loginModal.hide();
            if(isEmptyObject('sbess-app-clubPrefs')){            
                $state.go('app.clubselector');
            }
        }
        else{
            $ionicPopup.alert({title: 'Please enter a valid MyLaurier E-Mail.'});
        }
    }
  }

  $scope.$on('$destroy', function() {
    if($scope.loginModal) {
      $scope.loginModal.remove();
    }
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
    $ionicHistory.clearCache();
  }
  $scope.currClub = WebAPI.getClub($stateParams.clubId);
  
  //The app accesses the club description pages through URL routing. We do that here
  $scope.navigateToClub = function(clubID){
    $state.go('app.clubpage', { clubId: clubID });
  }  
 
  
  
/*
* Newsfeed
* Here we determine which events will populate our newsfeed based on the user's interests. 
* Allows the user to refresh by pulling down
*/
$scope.filterBy = "custom";
$scope.connectionNotifier = false; // So that the 'no network connection' popup only appears once
$scope.reloadFeed = function() {
    WebAPI.getAllEvents().then(function(APIresult){
        $scope.events = APIresult.data;
        $scope.customFeed = WebAPI.getCustomFeed(APIresult.data); //A big, long function that determines which events to show
    }, function(error){
        $ionicPopup.alert({
          title:"Oh snap!",
          template: "For some reason we couldn't get your custom newsfeed, please check your internet connection and try again."
        });
    });
    
}
//$scope.dummyEvents = WebAPI.dummyEvents;
  $scope.reloadFeed();
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     // handle event
     if (data.stateId == 'app.newsfeed') {
        $scope.reloadFeed();
     }
  });  
  
  $scope.doRefresh = function() {
    if(ConnectivityMonitor.isOnline()){  
        $scope.reloadFeed();
    }
    else{
        $ionicPopup.alert({
          title:"Oh snap!",
          template: "You're not connected. \n Try again later though!"
        });
    }
    $scope.$broadcast('scroll.refreshComplete');
  };
  ConnectivityMonitor.startWatching();
  
  $scope.setTab = function(tabData) {
    if (tabData == "all") {
      $scope.filterBy = "all";
    } else if (tabData == "custom") {
      $scope.filterBy = "custom";
    } 
  }
  
  

  
/*
* Events
* App accesses events through URL routing. Gives functionality to add events and their info to calendar through Cordova
*/
  $scope.loadEvent = function(id){
    $state.go('app.event', { eventId: id });
  }
  WebAPI.getAllEvents().then(function(APIresult){
       $scope.currEvent = APIresult.data[$stateParams.eventId];
  })
  //Adding events to the calendar
  $scope.addToCalendar = function() {
    try {
      var notes = $scope.currEvent.desc;
      $cordovaCalendar.createEventInteractively({
        title: $scope.currEvent.title,
        location: $scope.currEvent.location,
        notes: notes,
        startDate: $scope.currEvent.startDate,
        endDate: $scope.currEvent.endDate
      }).then(function(result) {
          
      }, function(err) {
        console.log(err);
        $ionicPopup.alert({
          title:"First one!",
          template: ""+err//"There was an error while trying to add " + $scope.currEvent.title + " to your calendar. Please try again!"
        });
        // error
      });
    } catch (err) {
      console.log(err);
      $ionicPopup.alert({
        title:"Second one!",
        template: ""+err//"There was an error while trying to add " + $scope.currEvent.title + " to your calendar. Please try again!"
      });
    }
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
    $ionicHistory.clearCache();
  }
  $scope.debug = function(){
      $ionicPopup.alert({
          title:"Debugging!",
      });
  }
  //Activated when user presses Save. Commits all preferences and stores them in JSON
  $scope.savePrefs = function(prefType, silently){
    if(silently == null) {
      silently = false;
    }
    if (prefType == "clubs"){ // If we're on the club selector
      var to_save = $scope.clubs;
      for(var x = 0; x < to_save.length; x++) {
        delete to_save[x]['$$hashKey'];
      }
      $localstorage.setObject('sbess-app-clubPrefs', to_save);
      WebAPI.getAllEvents().then(function(APIresult){
        $scope.events = APIresult.data;
        $scope.customFeed = WebAPI.getCustomFeed(APIresult.data); //A big, long function that determines which events to show    
      }, function(error){
        if(!silently) {
          $ionicPopup.alert({
            title:"Oh snap!",
            template: "For some reason we couldn't get your new custom newsfeed after saving your preferences, please check your internet connection and try again."
          });
        }
      });
      console.log("Saving clubs");
    } else if (prefType =="categories"){ //If we're on the category selector
      var to_save = $scope.prefOptions;
      for(var x = 0; x < to_save.length; x++) {
        if(to_save[x].hasOwnProperty('$$hashKey')) {
          delete to_save[x]['$$hashKey'];
        }
      }
      $localstorage.setObject('sbess-app-prefs', to_save);
      console.log("Saving preferences");
    }
    if (!silently) {
      $ionicPopup.alert({
       title: 'Preferences Updated',
      });      
    }
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