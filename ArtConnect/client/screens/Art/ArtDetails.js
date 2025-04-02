import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Dimensions, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PostContext } from '@/context/postContext';
import { toggleFavorite } from '@/HelperFunc/ToggleFavorite.js'
import { toggleFollowStatus } from '@/HelperFunc/ToggleFollowStatus.js'
import { AuthContext } from '@/context/authContext.js';
import FlightsSwiper from '@/components/Cards/Swiper.js';

const { width, height } = Dimensions.get('window');

const ArtDetails = ({ route, navigation }) => {
  const { loading: authLoading, state, refreshUser } = useContext(AuthContext)
  const { fetchArt } = useContext(PostContext);


  const [modalVisible, setModalVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [artDetails, setArtDetails] = useState(null);
  const { artId } = route.params;
  const [purchaseModelVisible, setPurchaseModelVisible] = useState(false)

  const [artIsFavorite, setArtIsFavorite] = useState(
    state?.user?.favorites.some(fav => fav.postId === artId)
  );
  const [isFollowing, setIsFollowing] = useState(false);


  const handleFavorite = async () => {
    try {
      await toggleFavorite({ postId: artId, userId: state?.user?._id });
      await refreshUser();
      setArtIsFavorite(!artIsFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleFollow = async () => {
    try {
      await toggleFollowStatus({ CurrentUserId: state?.user?._id, userId: artDetails?.artistID });
      await refreshUser();
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  useEffect(() => {
    const getArt = async () => {
      try {
        const data = await fetchArt(artId);
        if (data) {
          setArtDetails(data);
          setIsFollowing(
            state?.user?.following.some(user => user === data?.artistID)
          )
        } else {
          console.log('No data found');
          setArtDetails(null);
        }


      } catch (error) {
        console.error("Error fetching art:", error);
        setArtDetails(null);
      }
    };

    getArt();
  }, [artId]);

  useEffect(() => {
    if (!authLoading) {
      console.log(state.user.name);
    }
  }, [authLoading, artIsFavorite])


  const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!artDetails ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.swiperContainer}>

              <FlightsSwiper images={artDetails?.image || []} />

            </View>

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            />

            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>{artDetails?.name}</Text>
                <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
                  <Ionicons name={artIsFavorite ? 'heart' : 'heart-outline'} size={28} color={artIsFavorite ? "#FF6B6B" : "#fff"} />
                </TouchableOpacity>
              </View>

              <Text style={styles.category}>{artDetails?.category}</Text>
              <Text style={styles.price}>Price: ${artDetails?.price}</Text>

              <TouchableOpacity onPress={toggleDescription}>
                <Text
                  style={styles.description}
                  numberOfLines={isDescriptionExpanded ? undefined : 4}
                >
                  {artDetails?.description}
                </Text>
                {!isDescriptionExpanded && (
                  <LinearGradient
                    colors={['rgba(18,18,18,0)', 'rgba(18,18,18,1)']}
                    style={styles.descriptionGradient}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.bookButton} onPress={() => { navigation.navigate('OrderSummary', { item: artDetails }) }}>
                <Text style={styles.bookButtonText}>PURCHASE ARTWORK</Text>
              </TouchableOpacity>

              <View style={styles.artistSection}>
                <Text style={styles.artistInfoHeader}>Artist</Text>
                <View style={styles.artistContainer}>
                  <View style={styles.artistInfo}>
                    <Text style={styles.artistName}>{artDetails?.artistName ? artDetails?.artistName : artDetails?.artistID}</Text>
                  </View>
                  {
                    state?.user?._id && state?.user?._id !== artDetails?.artistID && (
                      <TouchableOpacity onPress={handleFollow} style={[styles.followButton, isFollowing && styles.followingButton]}>
                        <Text style={styles.followButtonText}>{isFollowing ? "Following" : "Follow"}</Text>
                      </TouchableOpacity>
                    )
                  }
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

                <Image
                  style={styles.fullScreenImage}
                  source={{ uri: artDetails?.image[0] }}
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
    flexGrow: 1,
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
  category: {
    fontSize: 16,
    color: '#FF6B6B',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: '#fff',
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
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap',
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

export default ArtDetails;
