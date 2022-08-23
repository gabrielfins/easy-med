import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Folder from '../../assets/images/folder.png';



export default function History() {
  const navigation = useNavigation();
    return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{backgroundColor: 'white'}}
    >
    <View style ={styles.view}>
      <img style={styles.folder} 
      src={Folder}
      alt="Histórico"
      />
      <Text style={styles.text1}>Histórico Vazio</Text>
      <Text style={styles.text2}>Nenhuma consulta realizada até o momento.</Text>
    </View>
    <View style={styles.voltar}>
      <TouchableOpacity style={styles.text3} onPress={() => navigation.navigate('HomeLayout')}>
        Voltar Para o Perfil
      </TouchableOpacity>
    </View>
    </ScrollView>
  ); 
}

const styles = StyleSheet.create({
  view:{
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    
  },

  folder:{
    flex: 1,
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
    paddingBottom: 70,

  },

  text1:{
    fontFamily: 'OpenSans',
    fontSize: 26,
    fontWeight: '900',
    paddingBottom: 10,
  },
  text2:{
    fontFamily: 'OpenSans',
    fontSize: 13,
    paddingBottom: 5,
  },
  text3:{
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#D1E2FF',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 3,
  },

  voltar:{
    
    color: '#3C84FB',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 25,
  }
})