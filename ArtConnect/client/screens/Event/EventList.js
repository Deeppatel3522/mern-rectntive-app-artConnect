import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { PostContext } from '@/context/postContext'; 
import FooterMenu from '@/components/Menus/FooteMenu.js';
import EventCard from '@/components/Cards/EventCard.js';
import EventForm from '@/components/Forms/EventForm.js'; 

const EventList = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { events } = useContext(PostContext);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {events.map((event, index) => (
            <EventCard key={index} event={event} navigation={navigation} />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add New Event</Text>
        </TouchableOpacity>

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
    backgroundColor: '#f5f5f5',
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
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 60,
  },
});

export default EventList;
