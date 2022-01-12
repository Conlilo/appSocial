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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        />
        <TextInput
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry={true}
          style={styles.inputText}
          placeholder=" Mật khẩu"
          value={password}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
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
});
