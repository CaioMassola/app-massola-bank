import React, { useEffect, useState } from 'react';
import { Icon, Input } from 'react-native-elements';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import  Background  from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ListDivider } from '../../components/ListDivider';

import Logo from '../../assets/svg/Vector.svg'
import { font } from '../../global/font';
import { styles } from './styles';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import { pt, en } from '../../global/localization'
import { connect } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setDarkMode } from '../../redux/actions/dark-mode-action';

const google = require('../../assets/google.jpg');

type Inputs = {
  email: string;
  password: string;
}

type ILogin = {
  dark_mode: boolean;
  setShowDarkMode: (value: boolean) => void;
}

const Login = (props: ILogin) => {

  const {dark_mode, setShowDarkMode} = props

  i18n.fallbacks = true;
  i18n.translations = { pt, en };
  i18n.locale = Localization.locale;

  const fieldsValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required(i18n.t('login.emailRequired'))
      .email(i18n.t('login.typeEmail')),
    password: yup
      .string()
      .required(i18n.t('login.passwordRequired'))
      .min(6, i18n.t('login.minPassword'))
  })

  const [visibilityPassword, setVisibilityPassword] = useState<boolean>(false);
  const [dark_mode_value, setDarkMode] = useState<boolean>(dark_mode);
  const { control, handleSubmit, formState: { errors }, register, setValue, clearErrors } = useForm<Inputs>({ resolver: yupResolver(fieldsValidationSchema) })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const changeVisibilityPassword = () => {
    !visibilityPassword ? setVisibilityPassword(true) : setVisibilityPassword(false);
  }

  const _handle_dark_mode = () => {

    !dark_mode_value ? setDarkMode(true) : setDarkMode(false);
    !dark_mode_value ? setShowDarkMode(true) : setShowDarkMode(false);

  }

  return (
    <Background dark_mode={dark_mode}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.config}>
              <Icon
                type='ionicon'
                name=''
                color='white'
                style={{ marginTop: 15, marginLeft: 10 }}
                tvParallaxProperties={null}
              />
              <TouchableOpacity
                onPress={() => {
                  _handle_dark_mode();
                }}
              >
                <Icon
                  type={dark_mode_value ? 'ionicon' : 'font-awesome-5'}
                  name={dark_mode_value ? 'sunny-sharp' : 'moon'}
                  color='white'
                  solid={true}
                  style={{ marginTop: 15, marginRight: 20 }}
                  tvParallaxProperties={null}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewIcon}>
              <Logo />
            </View>
            <Text style={styles.texto}>{i18n.t('login.welcome')}</Text>
            <View style={styles.inputView}>
              <Controller
                name="email"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t('login.placeholderEmail')}
                    inputStyle={{ color: 'white', fontFamily: font.fonts.title400 }}
                    keyboardType={'email-address'}
                    leftIcon={{ type: 'material', name: 'email', color: 'white' }}
                    errorStyle={{ color: '#ff4d4d', fontSize: 16, fontFamily: font.fonts.title400 }}
                    errorMessage={errors.email?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value)
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t('login.placeholderPassword')}
                    inputStyle={{ color: 'white', fontFamily: font.fonts.title400 }}
                    secureTextEntry={!visibilityPassword ? true : false}
                    rightIcon={{
                      type: 'material', name: `${!visibilityPassword ? 'visibility-off' : 'visibility'}`, color: 'white', onPress: () => {
                        changeVisibilityPassword()
                      }
                    }}
                    leftIcon={{
                      type: 'material', name: 'lock', color: 'white', onPress: () => {
                        changeVisibilityPassword()
                      }
                    }}
                    errorStyle={{ color: '#ff4d4d', fontSize: 16, fontFamily: font.fonts.title400 }}
                    errorMessage={errors.password?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value)
                    }}
                  />
                )}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.buttonView}>
                <ButtonIcon
                  color='white'
                  type='material'
                  icon='login'
                  height={40}
                  onPress={handleSubmit(onSubmit)}
                  title={i18n.t('login.btnLogin')}
                  img={0} />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => console.log('criarconta')}
            >
              <Text style={styles.createAnAccount}>{i18n.t('login.createAnAccount')}</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 25 }}>
              <ListDivider color={dark_mode_value ? '#999999' : 'black'} />
            </View>
            <View style={styles.googleView}>
              <Text style={styles.textGoogle}>{i18n.t('login.orSocialLogin')}</Text>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.buttonView}>
                  <ButtonIcon
                    color='white'
                    img={google}
                    height={40}
                    onPress={() => console.log('Google')}
                    title={i18n.t('login.btnGoogle')}
                    icon={''}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setShowDarkMode: (value: boolean) => {
    dispatch(setDarkMode(value));
  },
});

const Props = (state: any) => {
  const  dark_mode = state.darkModeReducer;

  return dark_mode ;
};

export default connect(Props, mapDispatchToProps)(Login);
