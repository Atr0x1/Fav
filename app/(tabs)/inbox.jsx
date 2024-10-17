import { View, Text } from 'react-native'
import React from 'react'
import { collection, query } from 'firebase/firestore'

export default function inbox() {

  const GetUserList=()=>{
    const q=query(collection)
  }
  return (
    <View>
      <Text>Inbox</Text>
    </View>
  )
}