import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({pet}) {
    
  return (
    <View style={styles.container}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap: 20
        }}>
      
      <View>
      <Text style={{
            fontFamily: 'medium',
            fontSize: 17
        }}>{pet?.username}</Text>
        <Text style={{
            fontFamily:'regular',
            color:Colors.GRAY
        }}>Pet Owner</Text>
      </View>
      </View>
      <Ionicons name="send" size={24} color={Colors.PRIMARY} />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        paddingHorizontal: 20,
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        gap: 20,
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        backgroundColor:Colors.WHITE,
        justifyContent: 'space-between',
    }
})