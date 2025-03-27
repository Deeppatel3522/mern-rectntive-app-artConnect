import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, SafeAreaView, RefreshControl } from 'react-native';
import { PostContext } from '@/context/postContext';
import FooterMenu from '@/components/Menus/FooteMenu.js';
import EventCard from '@/components/Cards/EventCard.js';
import EventForm from '@/components/Forms/EventForm.js';
import { AuthContext } from '@/context/authContext';

const EventList = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { loading: myPostLoading, events, getAllEvents } = useContext(PostContext);
  const { loading: authLoading, state } = useContext(AuthContext)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!myPostLoading && events) {
      console.log("Total EVENTS in EVENTLIST screen: ", events.length);
    }
  }, [myPostLoading])

  

  useEffect(() => {
    if (!authLoading && !myPostLoading) {
      setLoading(false);
    }
  }, [authLoading, myPostLoading])

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getAllEvents();
      if (!myPostLoading) {
        setRefreshing(false)
        console.log('Event List page Refreshing done.');
      }
    } catch (error) {
      console.error("Error refreshing Event Page:", error);
      setRefreshing(false);
    }
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {events.map((event, index) => (
            <EventCard key={index} event={event} navigation={navigation} />
          ))}
        </ScrollView>


        {
          state?.user?.type === "Artist" && (
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Add New Event</Text>
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
            <EventForm closeModal={() => setModalVisible(false)} />
          </View>
        </Modal>

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

export default EventList;
