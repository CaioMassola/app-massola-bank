import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
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

import {pt, en} from '../../global/localization'

const google = require('../../assets/google.jpg');

type Inputs = {
  email: string;
  password: string;
}

export const Login = () => {
  
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
  const { control, handleSubmit, formState: { errors}, register, setValue, clearErrors } = useForm<Inputs>({resolver: yupResolver(fieldsValidationSchema)})

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const changeVisibilityPassword = () => {
    !visibilityPassword ? setVisibilityPassword(true) : setVisibilityPassword(false);
  }


  return (
    <Background>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
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
                      type: 'material', name:'lock', color: 'white', onPress: () => {
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
              <ListDivider />
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