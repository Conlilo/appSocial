import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppImage } from '../core/image';
import { dataActions } from '../redux/slices/dataApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '../core/icon';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [encode, setEncode] = useState(true);
  const user = useSelector(state => state.data.dataUser);
  const dispatch = useDispatch();
  const userDispatch = user.filter(
    x => x.username === username && x.password === password,
  )[0];

  const hannderVerification = (username, password) => {
    if (username === '' || password === '') {
      Alert.alert(
        'Đăng nhập thất bại',
        'Số điện thoại và mật khẩu không thể để trống. Vui lòng nhập lại!',
        [
          {
            text: 'OK',
          },
        ],
      );
    } else if (
      user.filter(x => x.username === username && x.password === password)
        .length !== 1
    ) {
      Alert.alert(
        'Đăng nhập thất bại',
        'Số điện thoại và mật khẩu sai vui lòng kiểm lại',
        [
          {
            text: 'OK',
          },
        ],
      );
    } else {
      dispatch(dataActions.Login({ userDispatch }));
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={AppImage.Logo} style={styles.logoImage} />
        <Text style={styles.titleScreen}>Đăng nhập với tài khoản của bạn</Text>
        <TextInput
          onChangeText={text => {
            setUsername(text);
          }}
          style={styles.inputText}
          placeholder=" Số điện thoại "
          value={username}
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry={encode}
          style={styles.inputText}
          placeholder=" Mật khẩu"
          value={password}
        />
        <TouchableOpacity
          style={styles.showandhidePassword}
          onPress={() => {
            setEncode(!encode);
          }}>
          {encode ? <Image source={Icon.Eye} /> : <Image source={Icon.Eyent} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={async () => {
            const bodyFromData = new FormData();
            bodyFromData.append('userName', username);
            bodyFromData.append('client_Id', 'cuccumobile');
            bodyFromData.append('client_secret', 'cucumobile_secret');
            bodyFromData.append('grant_type', 'password');
            bodyFromData.append('password', password);
            await axios({
              method: 'post',
              // eslint-disable-next-line quotes
              url: `https://devaccount.cuccu.vn/connect/token`,
              data: bodyFromData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
              .then(function (response) {
                //handle success
                AsyncStorage.setItem('token', response.data.access_token);
                dispatch(
                  dataActions.Token({ response: response.data.access_token }),
                );
              })
              .catch(function (error) {
                //handle error
                console.log('error', error);
              });
            hannderVerification(username, password);
          }}>
          <Text style={styles.buttunLogin}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttunLogin: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoImage: {
    marginTop: 30,
    alignSelf: 'center',
    width: 164,
    height: 164,
  },
  logoText: {
    alignSelf: 'center',
    color: '#53E88B',
    fontSize: 40,
  },
  subText: {
    alignSelf: 'center',
    fontSize: 13,
  },
  titleScreen: {
    marginTop: 60,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 15,
    width: 325,
    height: 57,
    alignSelf: 'center',
    marginTop: 12,
    borderColor: 'gray',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#53E88B',
    width: 141,
    height: 57,
    alignSelf: 'center',
    marginTop: 26,
    marginBottom: 30,
    borderRadius: 15,
  },
  showandhidePassword: {
    position: 'absolute',
    right: 45,
    top: 417,
  },
});
