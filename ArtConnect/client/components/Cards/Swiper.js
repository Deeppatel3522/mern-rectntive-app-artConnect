import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, Modal, TouchableOpacity, View, StyleSheet, ActivityIndicator, Text, Share } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const FlightsSwiper = ({ images }) => {
    const flatlistRef = useRef(null);
    const screenWidth = Dimensions.get("window").width;
    const scrollX = useRef(new Animated.Value(0)).current;
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (images.length === 0) return;

        intervalRef.current = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % images.length; // go back to 0 when prevIndex reaches (length-1)
                flatlistRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [images]);

    const openImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => openImage(item)}>
            <View style={{ width: screenWidth, height: 400 }}>
                <Image
                    source={{ uri: item }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    onError={() => {
                        setLoading(false);
                        setError(true);
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />

                {loading && (
                    <ActivityIndicator
                        style={styles.loader}
                        size="large"
                        color="#0000ff"
                    />
                )}
            </View>
        </TouchableOpacity>
    );



    const shareImage = async () => {
        try {
            const shareContent = {
                message: `Check out this artwork:\n${selectedImage}`,
                url: selectedImage
            };

            await Share.share(shareContent);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ width: screenWidth, height: 400 }}>
            <FlatList
                data={images}
                ref={flatlistRef}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                    setActiveIndex(index);
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />

            <View style={styles.dotContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.activeDot : {}
                        ]}
                    />
                ))}
            </View>

            {selectedImage && (
                <Modal
                    visible={true}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={closeImage}
                >
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeImage}>
                            <Ionicons name="close" size={30} color="white" />
                        </TouchableOpacity>
                        <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />

                        <TouchableOpacity style={styles.shareButton} onPress={shareImage}>
                            <Ionicons name="share-social-outline" size={30} color="white" />
                        </TouchableOpacity>

                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 400,
        width: '100%',
    },
    dotContainer: {
        flexDirection: "row",
        justifyContent: "center",
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 6,
        backgroundColor: 'gray',
    },
    activeDot: {
        backgroundColor: 'white',
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '90%',
        height: '70%',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 10,
        borderRadius: 12,
    },
});

export default FlightsSwiper;
