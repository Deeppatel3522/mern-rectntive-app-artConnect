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

export default EventList;
