import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import { theme } from '../../constants/theme';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet'
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';

export default function PetDetails() {
  const pet=useLocalSearchParams();
  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerTransparent: true,
      headerTitle:''
    })
  })
  return (
    <View>
      <ScrollView>
      {/* Pet info */}
      <PetInfo pet={pet}/>
      {/* Pet Properties */}
      <PetSubInfo pet={pet}/>
      {/* about */}
      <AboutPet pet={pet}/>
      {/* owner details */}
      <OwnerInfo pet={pet}/>
      <View style={{height:70}}></View>

      

      </ScrollView>
      {/* adopt button */}
      <View style={styles.bottomContainer}>
      <TouchableOpacity style={styles.adoptBtn}>
        <Text style={{
          textAlign:'center',
          fontFamily: 'medium',
          fontSize: 20
        }}>Adopt Me</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  adoptBtn:{
    padding: 15,
    backgroundColor:Colors.PRIMARY
  },
  bottomContainer:{
    position:'absolute',
    width: '100%',
    bottom: 0

  }
})