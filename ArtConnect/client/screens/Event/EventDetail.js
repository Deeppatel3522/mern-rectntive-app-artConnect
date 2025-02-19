import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PostContext } from '@/context/postContext';
import { toggleFavorite } from '@/HelperFunc/ToggleFavorite.js'
import { AuthContext } from '@/context/authContext';

const { width, height } = Dimensions.get('window');

const EventDetails = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  const { eventId } = route.params;
  const { fetchEvent } = useContext(PostContext);
  const [state] = useContext(AuthContext)

  const handleFavorite = async () => {
    try {
      await toggleFavorite({ postId: eventId, userId: state?.user?._id });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const data = await fetchEvent(eventId);
        if (data) {
          setEventDetails(data);
          console.log(JSON.stringify(data, null, 4));
        } else {
          console.log('No data found');
          setEventDetails(null);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setEventDetails(null);
      }
    };

    getEvent();
  }, [eventId]);

  const toggleFollow = () => setIsFollowing(!isFollowing);
  const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString)?.toLocaleDateString(undefined, options);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!eventDetails ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.swiperContainer}>
              {/* <Swiper
                showsButtons={false}
                loop={false}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
              >
                {eventDetails?.image?.map((img, index) => (
                  <TouchableOpacity key={index} onPress={() => setModalVisible(true)}>
                    <Image
                      style={styles.image}
                      source={{ uri: img }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                ))}
              </Swiper> */}

              <Image
                style={styles.image}
                source={{ uri: eventDetails?.image[0] }}
                resizeMode='cover'
              />
            </View>

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            />

            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>{eventDetails?.name}</Text>
                <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
                  <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={28} color={isFavorite ? "#FF6B6B" : "#fff"} />
                </TouchableOpacity>
              </View>

              <View style={styles.eventInfo}>
                <View style={styles.infoItem}>
                  <Ionicons name="calendar-outline" size={16} color="#ccc" />
                  <Text style={styles.dateTime}>{formatDate(eventDetails?.date)}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="pricetag-outline" size={18} color="#ccc" />
                  <Text style={styles.price}>Price: ${eventDetails?.price}</Text>
                </View>

                <Text style={styles.category}>{eventDetails?.category}</Text>
              </View>

              <TouchableOpacity onPress={toggleDescription}>
                <Text
                  style={styles.description}
                  numberOfLines={isDescriptionExpanded ? undefined : 4}
                >
                  {eventDetails?.description}
                </Text>
                {!isDescriptionExpanded && (
                  <LinearGradient
                    colors={['rgba(18,18,18,0)', 'rgba(18,18,18,1)']}
                    style={styles.descriptionGradient}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>BOOK NOW</Text>
              </TouchableOpacity>

              <View style={styles.artistSection}>
                <Text style={styles.artistInfoHeader}>Artist</Text>
                <View style={styles.artistContainer}>
                  <View style={styles.artistInfo}>
                    <Text style={styles.artistName}>Artist ID: {eventDetails?.artistID}</Text>
                  </View>
                  <TouchableOpacity onPress={toggleFollow} style={[styles.followButton, isFollowing && styles.followingButton]}>
                    <Text style={styles.followButtonText}>{isFollowing ? "Following" : "Follow"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={30} color="#fff" />
                </TouchableOpacity>
                {/* <Swiper
                  showsButtons={false}
                  loop={false}
                  dot={<View style={styles.dot} />}
                  activeDot={<View style={styles.activeDot} />}
                >
                  {eventDetails?.image?.map((img, index) => (
                    <Image
                      key={index}
                      style={styles.fullScreenImage}
                      source={{ uri: img }}
                      resizeMode="contain"
                    />
                  ))}
                </Swiper> */}

                <Image
                  style={styles.fullScreenImage}
                    source={{ uri: eventDetails?.image[0] }}
                  resizeMode="contain"
                />
              </View>
            </Modal>
          </ScrollView>
        )}
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
    paddingBottom: 20,
  },
  swiperContainer: {
    height: 400,
    width: width,
  },
  image: {
    width: width,
    height: 400,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 300,
    height: 100,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: -40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  favoriteButton: {
    padding: 10,
  },
  eventInfo: {
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#FF6B6B',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 16,
    color: '#ccc',
    marginLeft: 5,
  },
  price: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#e0e0e0',
    lineHeight: 24,
    marginBottom: 20,
  },
  descriptionGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 45,
  },
  bookButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistSection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 20,
  },
  artistInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  artistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artistInfo: {
    flex: 1
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap'
  },
  followButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: '#2C3E50',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width,
    height: height,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
  },
  noImageText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 180,
  }
});

export default EventDetails;
