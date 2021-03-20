import React from 'react';
import {View, Text} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {useDispatch} from 'react-redux';
import {setIsAuth} from '../store/models/user';

const LoginScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login</Text>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
              dispatch(setIsAuth(true));
            });
          }
        }}
        onLogoutFinished={() => {
          console.log('logout.');
        }}
      />
    </View>
  );
};

export default LoginScreen;
