import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/colors';
import AppText from '../components/AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Home() {
  return (
    <View style={styles.home}>
      <View style={styles.header}>
        <StatusBar backgroundColor={colors.tertiary} />
        <View style={styles.titleContainer}>
          <AppText size={24} weight={700}>Olá, Gabriel</AppText>
          <Avatar.Icon icon="account" size={48} />
        </View>
        <View style={styles.searchContainer}>
          <AppText>O que você precisa?</AppText>
          <View style={styles.searchContent}>
            <MaterialIcons name="magnify" size={28} color="#ADADAD" />
            <TextInput style={styles.searchInput} placeholder="Especialidade, médico, etc..." />
          </View>
        </View>
      </View>
      <View style={styles.quickAccess}>
        <AppText>Acesso rápido</AppText>
        <View style={styles.quickAccessButtons}>
          <Pressable style={styles.quickAccessButton}>
            <MaterialIcons name="inbox-full" size={28} color={colors.primary} />
            <AppText weight={700} style={{color: colors.primary}}>Receitas</AppText>
          </Pressable>
          <View style={styles.separator} />
          <Pressable style={styles.quickAccessButton}>
            <MaterialIcons name="chart-line" size={28} color={colors.primary} />
            <AppText weight={700} style={{color: colors.primary}}>Exames</AppText>
          </Pressable>
          <View style={styles.separator} />
          <Pressable style={styles.quickAccessButton}>
            <MaterialIcons name="pill" size={28} color={colors.primary} />
            <AppText weight={700} style={{color: colors.primary}}>Remédios</AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    display: 'flex'
  },
  header: {
    display: 'flex',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: colors.tertiary
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchContainer: {
    marginTop: 16
  },
  searchContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 12,
    paddingLeft: 16,
    paddingRight: 16, 
    borderRadius: 25,
    backgroundColor: 'white'
  },
  searchInput: {
    flex: 1,
    marginLeft: 8
  },
  quickAccess: {
    display: 'flex',
    padding: 20
  },
  quickAccessButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
  quickAccessButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 5,
    backgroundColor: colors.secondary
  },
  separator: {
    flex: .1
  }
});
