# TODO:

- [x] Implement validation on the email within the initial launch modal to make sure it's a @mylaurier.ca email
- [ ] Fix 'Subscribe' button on club page to actually work
- [ ] Pull clubs & interests from an API
- [ ] Minimize the number of calls made to the API
- [ ] Add in clubs & interest selector into the initial launch modal
- [ ] Add in end date to events
- [ ] Fix spacing on the newsfeed so that the last event is not hidden by the tabs
- [ ] Fix social media buttons on event pages
- [ ] Fix social media follow buttons on club pages
- [ ] Establish standard for "Place" for each event, i.e. if it has room number it should say "P1005, Peters" for each event
- [ ] Ensure if no banner specified for event then no banner is displayed
- [ ] Swipe to go back a page
- [ ] "Select all" for club and interest selector pages
- [ ] Discount card page

# Suggestions to consider

- Calendar view of upcoming events

ngCordova Plugins:

- [cordovaNetwork](http://ngcordova.com/docs/plugins/network/)
- [cordovaCalendar](http://ngcordova.com/docs/plugins/calendar/)
- [cordovaWhiteList](http://docs.ionic.io/docs/cordova-whitelist)

So run:

    cordova plugin add cordova-plugin-calendar
    cordova plugin add cordova-plugin-network-information
    cordova plugin add cordova-plugin-whitelist


Keystore Password: np}&zz'h5a5[HcT-

Release building commands:

    cordova build --release android
    keytool -genkey -v -keystore lazsoc-release-key.keystore -alias lazsoc -keyalg RSA -keysize 2048 -validity 10000
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore lazsoc-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk lazsoc
    /usr/local/opt/android-sdk/build-tools/23.0.3/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk LazSoc.apk
