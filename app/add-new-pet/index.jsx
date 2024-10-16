import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors'
import {Picker} from '@react-native-picker/picker'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db, storage } from '../../config/FirebaseConfig'
import * as ImagePicker from 'expo-image-picker'
import {  getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext'

export default function AddNewPet() {
    const { user, setAuth } = useAuth();
    const navigation = useNavigation();
    const [formData, setFormData] = useState(
        {category: 'Dogs', sex: 'Male'}
    );
    const [gender, setGender] = useState();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [image,setImage]= useState();
    const [loader,setLoader] = useState(false);

    useEffect (()=>{
        navigation.setOptions({
            headerTitle: 'Add New Pet'
        })
        GetCategories();
    },[])

    const GetCategories = async () => {
        setCategoryList([]);
        const snapshot = await getDocs(collection(db, 'Category'));
        snapshot.forEach((doc) => {
          setCategoryList(categoryList=>[...categoryList,doc.data()])
        });
    }

    const imagePicker= async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
    }

    const handleInputChange = ( fieldName, fieldValue)=>{
       // console.log(fieldName, fieldValue)
       setFormData(prev=>({
        ...prev,
        [fieldName] : fieldValue
       }))
    }

    const onSubmit=()=>{
        //console.log(formData);
        if(Object.keys(formData).length!=8)
        {
            ToastAndroid.show('Enter all Details', ToastAndroid.SHORT)
            return ;
        }
        
        UploadImage();
    }
    //use to upload image to the firebase DB
    const UploadImage=async()=>{ 
        setLoader(true)

        const resp=await fetch(image);
        const blobImage = await resp.blob();
        const storageRef = ref(storage, '/PetAdopt/' +Date.now() +'.jpg');

        uploadBytes(storageRef, blobImage).then((snapshot)=>{
            console.log('File Uploaded')
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
                SaveFormData(downloadUrl)

            })
        })
    }

    const SaveFormData=async(imageUrl)=>{
        const docId=Date.now().toString();
        await setDoc(doc(db, 'Pets', docId),{
            ...formData,
            imageUrl : imageUrl,
            username : user && user.name,
            email: user && user.email,
            userImage : user?.image,
            id:docId
        })
        setLoader(false);

    }
  return (
    <ScrollView style={{
        padding: 20,
        marginTop: 20
    }}>
      <Text style={{
        fontFamily: 'medium',
        fontSize: 20
      }}>Add New Pet for adoption</Text>

      <Pressable onPress={imagePicker}>
       {!image? <Image source={require('./../../assets/images/placeholder.png')}
        style={{
            width: 100,
            height: 100,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.GRAY
        }}/>:
        <Image source = {{uri: image}}
        style={{
            width: 100,
            height: 100,
            borderRadius: 15,
            
        }}/>}
        </Pressable>

      <View style ={styles.inputContainer}>
        <Text style = {styles.label}>Pet Name*</Text>
            <TextInput style={styles.input}
            onChangeText={(value)=>handleInputChange('name', value)}/>
      </View>

      <View tyle ={styles.inputContainer}>
      <Text style = {styles.label}>Pet Category*</Text>
            <Picker
                    selectedValue={selectedCategory}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) =>{
                        setSelectedCategory(itemValue);
                        handleInputChange('category', itemValue)
                    }}>
                        {categoryList.map((category,index)=>(
                             <Picker.Item key={index} label={category.name} value={category.name} />
                        ))}
                    
                    
                </Picker>
        </View>



      <View style ={styles.inputContainer}>
        <Text style = {styles.label}>Pet Breed*</Text>
            <TextInput style={styles.input}
            onChangeText={(value)=>handleInputChange('breed', value)}/>
      </View>

      <View style ={styles.inputContainer}>
        <Text style = {styles.label}>Age*</Text>
            <TextInput style={styles.input}
            keyboardType='numeric'
            onChangeText={(value)=>handleInputChange('age', value)}/>
      </View>
            <View tyle ={styles.inputContainer}>
            <Text style = {styles.label}>Gender*</Text>
                    <Picker
                            selectedValue={gender}
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) =>{
                                setGender(itemValue);
                                handleInputChange('sex', itemValue)
                            }}>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                </View>

      <View style ={styles.inputContainer}>
        <Text style = {styles.label}>Weight*</Text>
            <TextInput style={styles.input}
            keyboardType='numeric'
            onChangeText={(value)=>handleInputChange('weight', value)}/>
      </View>

      <View style ={styles.inputContainer}>
        <Text style = {styles.label}>Address*</Text>
            <TextInput style={styles.input}
            onChangeText={(value)=>handleInputChange('address', value)}/>
      </View>

      <View style ={styles.inputContainer}>
        <Text style = {styles.label}>About*</Text>
            <TextInput style={styles.input}
            numberOfLines={5}
            multiline={true}
            onChangeText={(value)=>handleInputChange('about', value)}/>
      </View>

      <TouchableOpacity 
      style={styles.button}
      disabled={loader}
       onPress={onSubmit}>
        {loader?<ActivityIndicator size={''}/>:
         <Text style={{fontFamily: 'medium', textAlign:'center'}}>Submit</Text>}
       

      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    inputContainer:{

    },
    input:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius: 7,
         fontFamily: 'regular'
    },
    label:{
        marginVertical: 5,
        fontFamily: 'regular'
    },
    button:{
        padding: 15,
        backgroundColor:Colors.PRIMARY,
        borderRadius: 7,
        marginVertical: 10,
        marginBottom: 50,  
       
    }
})