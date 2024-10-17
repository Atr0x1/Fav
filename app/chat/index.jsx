import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import {GiftedChat} from 'react-native-gifted-chat'
import moment from 'moment';


export default function ChatScreen () {
  const [messages, setMessages] = useState([])
  const params = useLocalSearchParams();
  const navigation=useNavigation();
  //console.log(params);
  const { user, setAuth } = useAuth();

  useEffect(()=>{
    GetUserDetails();
    const unsubscribe=onSnapshot(collection(db,'Chat', params?.id, 'Messages'),(snapshot)=>{
      const messageData=snapshot.docs.map((doc)=>({
        _id:doc.id,
        ...doc.data()
      }))
      setMessages(messageData)
    });

    return()=>unsubscribe();
  },[])

  const GetUserDetails= async()=>{
    const docRef=doc(db, 'Chat', params?.id);
    const docSnap =await getDoc(docRef);

    const result=docSnap.data();
    console.log(result);
    const otherUser=result?.users.filter(item=>item.email!=user?.email);
    console.log(otherUser);
    navigation.setOptions({
      headerTitle:otherUser[0].name
    })
  }

  const onSend=async(newMessage)=>{
    setMessages((previousMessage)=>GiftedChat.append(previousMessage,newMessage));
    newMessage[0].createdAt=moment().format('MM-DD-YYYY HH:mm')
    await addDoc(collection(db,'Chat', params.id, 'Messages'), newMessage[0])
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user?.email,
        name:user?.name,
      }}
    />
  )
}