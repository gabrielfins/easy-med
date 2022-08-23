import { View, TextInput, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/colors';
import AppText from '../components/AppText';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Home() {
    return (
        <View style={styles.profile}>
            <View style={styles.header}>
                <StatusBar backgroundColor={colors.white} />
                <View style={styles.nameBox}>
                    <Avatar.Icon icon="account-outline" size={120} />
                    <View style={styles.name}>
                        <AppText size={24} weight={600}>Gabriel Oliveira</AppText>
                        <AppText style={styles.underName} size={16} weight={100}>Paciente</AppText>
                    </View>
                </View>
            </View>
            <View style={styles.blocks}>
                <Pressable>
                    <View style={styles.content}>
                        <MaterialIcons name="bell-outline" size={30} />
                        <View style={styles.name}>
                            <AppText size={20} weight={100}>Notificações</AppText>
                            <AppText style={styles.underName} size={13} weight={100}>Central de Notificações</AppText>
                        </View>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.content}>
                        <MaterialIcons name="folder-outline" size={30} />
                        <View style={styles.name}>
                            <AppText size={20} weight={100}>Histórico</AppText>
                            <AppText style={styles.underName} size={13} weight={100}>Consultas realizadas</AppText>
                        </View>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.content}>
                        <MaterialIcons name="cog-outline" size={30} />
                        <View style={styles.name}>
                            <AppText size={20} weight={100}>Configurações</AppText>
                            <AppText style={styles.underName} size={13} weight={100}>Privacidade, segurança e acessibilidade</AppText>
                        </View>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.content}>
                        <MaterialIcons name="text-box-outline" size={30} />
                        <View style={styles.name}>
                            <AppText size={20} weight={100}>Dê sua opinião</AppText>
                            <AppText style={styles.underName} size={13} weight={100}>Compartilhe sua experiência</AppText>
                        </View>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.content}>
                        <MaterialIcons name="account-question-outline" size={30} />
                        <View style={styles.name}>
                            <AppText size={20} weight={100}>Ajuda</AppText>
                            <AppText style={styles.underName} size={13} weight={100}>Fale conosco, política de privacidade</AppText>
                        </View>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.content}>
                        <MaterialIcons name="exit-to-app" size={30} />
                        <View style={styles.name}>
                            <AppText size={20} weight={100}>Sair</AppText>
                        </View>
                    </View>
                </Pressable>
            </View>              
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
        display: 'flex',
        backgroundColor: 'white'
    },
    header: {
        display: 'flex',
        padding: 20,
        paddingTop: 40,
        backgroundColor: 'white'
    },
    nameBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    name: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        
    },
    categoryName: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 80,
    },
    underName: {
        color: 'grey'
    },
    blocks: {
        display: 'flex',
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: 'whitesmoke',
        
    },
    content: {
        padding: 18,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    separator: {
        flex: .1
    }
});
