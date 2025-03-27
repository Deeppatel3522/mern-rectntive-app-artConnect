import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, SafeAreaView, RefreshControl } from 'react-native';
import { PostContext } from '@/context/postContext';
import FooterMenu from '@/components/Menus/FooteMenu';
import ArtCard from '@/components/Cards/ArtCard.js';
import ArtForm from '@/components/Forms/ArtForm.js';
import { AuthContext } from '@/context/authContext';

const ArtList = ({ navigation }) => {

  const { loading: authLoading,state } = useContext(AuthContext)
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

        {
          state?.user?.type === "Artist" && (
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Add New Art</Text>
            </TouchableOpacity>
          )
        }

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <ArtForm closeModal={() => setModalVisible(false)} />
          </View>
        </Modal>

        <View style={styles.footer}>
          <FooterMenu />
        </View>
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
    paddingBottom: 100,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
});

export default ArtList;
