import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, SafeAreaView, RefreshControl } from 'react-native';
import { PostContext } from '@/context/postContext';
import FooterMenu from '@/components/Menus/FooteMenu';
import ArtCard from '@/components/Cards/ArtCard.js';
import ArtForm from '@/components/Forms/ArtForm.js';
import { AuthContext } from '@/context/authContext';

const ArtList = ({ navigation }) => {

  const { loading: authLoading, state } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false);
  const { loading: myArtLoading, arts, getAllArts } = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getAllArts();
      if (!myArtLoading) {
        setRefreshing(false)
        console.log('Art List page Refreshing done.');
      }
    } catch (error) {
      console.error("Error refreshing Art Page:", error);
      setRefreshing(false);
    }
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {arts.map((art, index) => (
            <ArtCard key={index} art={art} navigation={navigation} />
          ))}
        </ScrollView>


        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 10,
  },

});

export default ArtList;
