import { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useCall } from '../hooks/use-call';
import { colors } from '../styles/colors';
import { CallService } from '../services/call-service';
import { useParams } from 'react-router-native';
import { Call } from '../models/call';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CallPage() {
  const { localStream, remoteStream, webcamStarted } = useCall();

  const [call, setCall] = useState<Call | null>();

  const params = useParams();

  const callService = useMemo(() => new CallService(), []);

  useEffect(() => {
    if (!params.id) return;
    callService.get(params.id)
      .then(setCall)
      .catch(console.log)
  }, [params]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.hangup} activeOpacity={0.5} onPress={() => callService.delete(call?.callCode || '')}>
          <MaterialIcons name="phone-hangup" size={32} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    padding: 12,
    paddingBottom: 40
  },
  hangup: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 50,
    borderRadius: 40,
    backgroundColor: colors.error
  },
});
