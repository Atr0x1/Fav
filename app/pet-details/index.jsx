import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import { theme } from '../../constants/theme';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';
import AboutPet from '../../components/PetDetails/AboutPet';
import {collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useAuth } from '../../contexts/AuthContext';

export default function PetDetails() {
  const pet=useLocalSearchParams();
  const navigation=useNavigation();
  const { user, setAuth } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    navigation.setOptions({
      headerTransparent: true,
      headerTitle:''
    })
  },[])

  /** use to chat between user to user */
  const InitiateChat = async () => {
    const docId1 = user?.email + '_' + pet?.email;
    const docId2 = pet?.email + '_' + user?.email;
  
    
    if (!user?.email || !pet?.email) {
      console.error("User email or pet email is undefined");
      return; 
    }
  
    const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(doc => {
      //console.log(doc.data());
      router.push({
        pathname:'/chat',
        params: {id:doc.id}
      })
      
    });
  
    if (querySnapshot.docs?.length == 0) {
      
      await setDoc(doc(db, 'Chat', docId1), {
        id: docId1,
        users: [
          {
            email: user?.email || "unknown email",
            imageUrl: user?.imageUrl || "default image url",
            name: user?.name || "Unknown Name"
          },
          {
            email: pet?.email || "unknown email",
            imageUrl: pet?.userImage || "default image url",
            name: pet?.username || "Unknown Name"
          }
        ],
        userIds: [user?.email || "unknown email", pet?.email || "unknown email"]
      });
  
      router.push({
        pathname: '/chat',
        params: { id: docId1 }
      });
    }
  };
  
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
      <TouchableOpacity   
      onPress={InitiateChat}
      style={styles.adoptBtn}>
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