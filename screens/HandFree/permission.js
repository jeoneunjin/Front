
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

async function requestCameraAndMicrophonePermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera and microphone');
      } else {
        console.log('Camera or microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);
    const microphoneStatus = await check(PERMISSIONS.IOS.MICROPHONE);

    if (cameraStatus !== RESULTS.GRANTED) {
      await request(PERMISSIONS.IOS.CAMERA);
    }

    if (microphoneStatus !== RESULTS.GRANTED) {
      await request(PERMISSIONS.IOS.MICROPHONE);
    }
  }
}

export default requestCameraAndMicrophonePermissions