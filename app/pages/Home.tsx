import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/colors';
import AppText from '../components/AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ShortcutButton from '../components/ShortcutButton';
import EventLink from '../components/EventLink';

export default function Home() {
  return (
    <View style={styles.home}>
      <View style={styles.header}>
        <StatusBar backgroundColor={colors.tertiary} />
        <View style={styles.titleContainer}>
          <AppText size={24} weight="bold">Olá, Gabriel</AppText>
          <Link to="/profile" underlayColor="transparent">
            <Avatar.Icon icon="account" size={48} />
          </Link>
        </View>
        <View style={styles.searchContainer}>
          <AppText>O que você precisa?</AppText>
          <View style={styles.searchContent}>
            <MaterialIcons name="magnify" size={28} color="#ADADAD" />
            <TextInput style={styles.searchInput} placeholder="Especialidade, médico, etc..." />
          </View>
        </View>
      </View>
      <View style={styles.homeGroup}>
        <AppText>Acesso rápido</AppText>
        <View style={styles.shortcuts}>
          <ShortcutButton icon="inbox-full" to="/">Receitas</ShortcutButton>
          <View style={styles.separator} />
          <ShortcutButton icon="chart-line" to="/">Exames</ShortcutButton>
          <View style={styles.separator} />
          <ShortcutButton icon="pill" to="/">Remédios</ShortcutButton>
        </View>
      </View>
      <View style={styles.homeGroup}>
        <AppText>Próximos agendamentos</AppText>
        <View style={styles.homeList}>
          <EventLink
            icon="clock-outline"
            description="Neurologista"
            title="Dr. Luiz Gomes"
            info="25/04/2022 • 17h30"
            to="/"
          />
          <View style={styles.vSeparator} />
          <EventLink
            icon="clock-outline"
            description="Ortopedista"
            title="Dr. Roberto Alvez"
            info="04/05/2022 • 14h00"
            to="/"
          />
        </View>
      </View>
      <View style={styles.homeGroup}>
        <AppText>Próximos remédios</AppText>
        <View style={styles.homeList}>
          <EventLink
            icon="pill"
            description="1 comprimido antes de comer"
            title="Biomag"
            info="Hoje • 12h00"
            to="/"
          />
          <View style={styles.vSeparator} />
          <EventLink
            icon="pill"
            description="1 comprimido"
            title="Alprazolam"
            info="Hoje • 18h00"
            to="/"
          />
          <View style={styles.vSeparator} />
          <EventLink
            icon="pill"
            description="1 comprimido antes de dormir"
            title="Venvanse"
            info="Hoje • 23h00"
            to="/"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    display: 'flex',
    paddingBottom: 20
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
  homeGroup: {
    display: 'flex',
    padding: 20,
    paddingBottom: 4
  },
  shortcuts: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
  homeList: {
    display: 'flex',
    marginTop: 8
  },
  separator: {
    flex: .1
  },
  vSeparator: {
    height: 8
  }
});
