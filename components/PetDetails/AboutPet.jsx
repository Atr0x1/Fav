import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'medium', fontSize: 18 }}>
        About Pet {pet?.name}
      </Text>
      
      {/* Conditionally display either 3 lines or full text based on 'readMore' */}
      <Text
        numberOfLines={readMore ? undefined : 3} 
        style={{ fontFamily: 'regular', fontSize: 14 }}>
        {pet?.about}
      </Text>
      
      {/* Toggle between 'Read More' and 'Read Less' */}
      <TouchableOpacity onPress={() => setReadMore(!readMore)}>
        <Text style={{
          fontFamily: 'medium',
          fontSize: 14,
          color:Colors.SECONDARY
         }}>
          {readMore ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
