MAKE SURE YOU RUN: cordova plugin add cordova-plugin-calendar

Keystore Password: np}&zz'h5a5[HcT-


cordova build --release android

keytool -genkey -v -keystore lazsoc-release-key.keystore -alias lazsoc -keyalg RSA -keysize 2048 -validity 10000

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore lazsoc-release-key.keystore android-release-unsigned.apk lazsoc

/usr/local/opt/android-sdk/build-tools/23.0.3/zipalign -v 4 android-release-unsigned.apk LazSoc.apk
