import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons'; // Assuming you're using some icon package for the back icon
import { useRouter } from 'expo-router'; // Assuming you're using expo-router
import BackButton from '../BackButton';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PetInfo({ pet }) {
  const router = useRouter(); // For navigation

  return (
    <View>
      {/* BackButton positioned absolutely */}
     <View style={styles.backButton}>
     <BackButton router={router}/>
     </View>
      {/* Image */}
      <Image
        source={{ uri: pet?.imageUrl }}
        style={styles.image}
      />
      <View style= {{
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
      }}>
        <View>
            <Text style={{
                fontFamily: 'bold',
                fontSize: 27
            }}>{pet?.name}</Text>
            <Text style={{
                fontFamily: 'regular',
                fontSize: 16,
                color:Colors.GRAY
            }}>{pet?.address}</Text>
        </View>
        <Ionicons name="heart-outline" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover', // Changed objectFit to resizeMode
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust this based on your design (add more padding if needed)
    left: 20, // This will place the button slightly inside from the left edge
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', // Add background for better visibility
    borderRadius: 20, // Rounded button
    zIndex: 1, // Ensure it's on top of the image
  },
});
