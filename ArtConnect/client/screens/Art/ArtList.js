import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker';

const ArtList = () => {
  const [image, setImage] = useState();
  const [images, setImages] = useState([])

  // upload image from gallery
  const uploadImage = async (mode) => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled) {
        await saveImage(result.assets[0].uri)
      }

    } catch (error) {
      alert(`uploading image Error: ${error}`)
    }
  }
  // save uploded image 
  const saveImage = (image) => {
    try {
      setImage(image)
      setImages((prevImages) => [...prevImages, image]);

    } catch (error) {
      alert(`Saving image Error: ${error}`)
    }
  }
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text>ArtList</Text>
      <Image
        source={{ uri: image ? image : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png" }}
        style={{ height: 200, width: 200, borderWidth: .5, margin: 10 }}
      />
      <FontAwesome5
        name='camera'
        style={{
          backgroundColor: '#fff1ff',
          borderRadius: 5,
          padding: 10,
          fontSize: 24,
          margin: 10,
          borderWidth: 1,
          color: 'gray'
        }}
        onPress={
          () => { uploadImage() }
        }
      />
      <Text>{image}</Text>

      <ScrollView style={{ margin: 20, width: '100%', height: 350, }}>
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{ height: 100, width: 100, margin: 5, borderWidth: 0.5, }}
          />
        ))}
      </ScrollView>

    </View>
  )
}

export default ArtList