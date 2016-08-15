angular.module('sbess.controllers', ['ionic','sbess.services','ngCordova','sbess.utils', 'IonicModalNav'])
.controller('NavCtrl', ['$scope', '$location','$stateParams', function($scope, $location, $stateParams) {
}])

.controller('MainCtrl', ['$scope', '$location','$stateParams','WebAPI', '$ionicModal', '$timeout','$cordovaCalendar','$ionicPopup','$localstorage','$http','ConnectivityMonitor', '$ionicPlatform', '$ionicHistory', '$state','$ionicScrollDelegate', '$ionicSideMenuDelegate', 'IonicModalNavService', function($scope, $location, $stateParams, WebAPI, $ionicModal, $timeout,$cordovaCalendar,$ionicPopup,$localstorage,$http,ConnectivityMonitor, $ionicPlatform, $ionicHistory, $state, $ionicScrollDelegate, $ionicSideMenuDelegate, IonicModalNavService) {
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
          backdropClickToClose: false,
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
    } else if ($scope.selectpreferences) {
      $scope.selectpreferences.remove();
    }
    if($scope.clubModal){
        $scope.clubModal.remove();
    }
  });

$scope.openPreferenceModal = function() {
  IonicModalNavService.show('app.selectpref');
}
$scope.preferencesClose = function() {
  IonicModalNavService.hide();
  //IonicModalNavService.destroy();
}
$scope.preferencesGoBack = function(data) {
  IonicModalNavService.goBack(data);
}
$scope.preferencesChangePage = function(type) {
  IonicModalNavService.go(type);
}

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
$scope.filterByTime = "thisweek";
$scope.connectionNotifier = false; // So that the 'no network connection' popup only appears once
$scope.reloadFeed = function() {
    WebAPI.getAllEvents().then(function(APIresult){
        $scope.events = APIresult.data;
        $scope.customFeed = WebAPI.getCustomFeed(APIresult.data); //A big, long function that determines which events to show
        $scope.filteredFeed = $scope.applyFilters($scope.customFeed);
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
  
  $scope.setNewsfeedType = function(tabData) {
    $ionicScrollDelegate.scrollTop();
    $scope.filterBy = tabData;
    $scope.filteredFeed = $scope.applyFilters($scope.customFeed);
  }
  $scope.setNewsfeedTimeperiod = function (timeperiod) {
    $ionicScrollDelegate.scrollTop();
    $scope.filterByTime = timeperiod;
    $scope.filteredFeed = $scope.applyFilters($scope.customFeed);
  }

$scope.rightNewsfeedSwipe = function() {
  if($scope.filterByTime == 'past') {

  } else if ($scope.filterByTime == 'thisweek') {
    $scope.setNewsfeedTimeperiod('past');
    $ionicSideMenuDelegate.canDragContent(true);
  } else if ($scope.filterByTime == 'nextweek') {
    $scope.setNewsfeedTimeperiod('thisweek');
    $ionicSideMenuDelegate.canDragContent(false);
  } else if ($scope.filterByTime == 'upcoming') {
    $scope.setNewsfeedTimeperiod('nextweek');
    $ionicSideMenuDelegate.canDragContent(false);
  }
  console.log("right swipe");
}

$scope.leftNewsfeedSwipe = function() {
  if($scope.filterByTime == 'past') {
    $scope.setNewsfeedTimeperiod('thisweek');
    $ionicSideMenuDelegate.canDragContent(false);
  } else if ($scope.filterByTime == 'thisweek') {
    $scope.setNewsfeedTimeperiod('nextweek');
    $ionicSideMenuDelegate.canDragContent(false);
  } else if ($scope.filterByTime == 'nextweek') {
    $scope.setNewsfeedTimeperiod('upcoming');
    $ionicSideMenuDelegate.canDragContent(false);
  } else if ($scope.filterByTime == 'upcoming') {

  }

  console.log("left swipe");
}

/*
* Social Media
* The app utilizies social media to share events, clubs, etc as well as linking to partner social media handles. This gives the functionality to share items through various social media platforms. 
*/ 
$scope.openSocialLink = function(type) {
  if (type == 'fb') {
    window.open($scope.currEvent.facebookEvent, '_system');
  }
}

/*
* Sample usage:
* oldOpenSocialLink('https://www.facebook.com/events/1090875194312444/', 'fb://events/1090875194312444', 'fb://', 'com.facebook.katana');
* This function is not used because applinks are undocumented and can be changed by the developer without any notice or update
*/
$scope.oldOpenSocialLink = function(httplink, applink, iOSScheme, androidScheme) {
  var scheme = null;
  if (ionic.Platform.isAndroid()) {
    scheme = androidScheme;
  } else if (ionic.Platform.isIOS()) {
    scheme = iOSScheme;
  }
  if(scheme) {
    appAvailability.check(
      scheme,
      function() {
        // They have the app
        window.open(applink, '_system');
        console.log("Opening app link");
      },
      function() {
        // They don't have the app
        window.open(httplink, '_system');
        console.log(httplink);
        console.log("Opening http link, with scheme");
      }
    );
  } else {
    // If platform not Android or iOS or scheme is not inputted, open the httplink in browser
    window.open(httplink, '_system');
    console.log("Opening http link, no scheme");
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
      var endDate = $scope.currEvent.endDate;
      $cordovaCalendar.createEventInteractively({
        title: $scope.currEvent.title,
        location: $scope.currEvent.location,
        notes: notes,
        startDate: new Date($scope.currEvent.startDate),
        endDate: new Date($scope.currEvent.endDate)
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

  /*
  * Applying filters for newsfeed
  * Here the newsfeed is generated based upon the filters the user selected. This applies both time and interest/club filters at once.
  */
  $scope.applyFilters = function(newsfeed) {
    var source = [];
    var result = [];
    if($scope.filterBy == 'custom') {
      source = $scope.customFeed;
    } else { // All
      source = $scope.events;
    }
    var curr = new Date();
    if ($scope.filterByTime == 'thisweek') {
      var today = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      var one_week = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
      for(var x = 0; x < source.length; x++) {
        var event_start_time = new Date(source[x].startDate);
        if(event_start_time >= today && event_start_time <= one_week) {
          result.push(source[x]);
        }
      }
    } else if ($scope.filterByTime == 'nextweek') {
      var one_week = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
      var two_weeks = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
      for(var x = 0; x < source.length; x++) {
        var event_start_time = new Date(source[x].startDate);
        if(event_start_time >= one_week && event_start_time <= two_weeks) {
          result.push(source[x]);
        }
      }
    } else if ($scope.filterByTime == 'past') {
      var today = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      console.log(today);
      for(var x = 0; x < source.length; x++) {
        var event_start_time = new Date(source[x].startDate);
        if(event_start_time < today) {
          result.push(source[x]);
        }
      }
    } else { // Upcoming
      var two_week = new Date(curr.setDate(curr.getDate() - curr.getDay() + 14));
      for(var x = 0; x < source.length; x++) {
        var event_start_time = new Date(source[x].startDate);
        if(event_start_time > two_weeks ) {
          result.push(source[x]);
        }
      }
    }
    return result;
  }

  $scope.goToPrefPage = function() {
    $state.go('app.viewpreferences');
  }

  //Activated when user presses Save. Commits all preferences and stores them in JSON
  $scope.savePrefs = function(prefType, silently){
    if(silently == null) {
      silently = false;
    }
    if (prefType == "clubs"){ // If we're on the club selector
      $scope.saveClubPreferences();
      console.log("Saving clubs");
    } else if (prefType =="categories"){ //If we're on the category selector
      $scope.saveInterests();
      console.log("Saving preferences");
    } else if (prefType == 'all') { // If we're on the preference page selector
      $scope.saveClubPreferences();
      $scope.saveInterests();
      console.log("Saving preferences and clubs");
    }
    if (!silently) {
      $ionicPopup.alert({
       title: 'Preferences Updated',
      });      
    }
  }

  $scope.saveInterests = function () { 
    var to_save = $scope.prefOptions;
    for(var x = 0; x < to_save.length; x++) {
      if(to_save[x].hasOwnProperty('$$hashKey')) {
        delete to_save[x]['$$hashKey'];
      }
    }
    $localstorage.setObject('sbess-app-prefs', to_save);
  }

  $scope.saveClubPreferences = function() {
    var to_save = $scope.clubs;
    for(var x = 0; x < to_save.length; x++) {
      delete to_save[x]['$$hashKey'];
    }
    $localstorage.setObject('sbess-app-clubPrefs', to_save);
    WebAPI.getAllEvents().then(function(APIresult){
      $scope.events = APIresult.data;
        $scope.customFeed = WebAPI.getCustomFeed(APIresult.data); //A big, long function that determines which events to show
        $scope.filteredFeed = $scope.applyFilters($scope.customFeed);
      }, function(error){
        if(!silently) {
          $ionicPopup.alert({
            title:"Oh snap!",
            template: "For some reason we couldn't get your new custom newsfeed after saving your preferences, please check your internet connection and try again."
          });
        }
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