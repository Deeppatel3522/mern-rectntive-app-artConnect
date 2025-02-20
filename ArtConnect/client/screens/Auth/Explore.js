import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image, SafeAreaView } from 'react-native';
import FooterMenu from '@/components/Menus/FooteMenu.js';
import { PostContext } from '@/context/postContext';
import PopularArtCard from '@/components/Cards/PopularArtCard';
import ExhibitionCard from '@/components/Cards/ExhibitionCard.js';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '@/context/authContext';

const Explore = ({ navigation }) => {
    const [state] = useContext(AuthContext)
    const { events, arts } = useContext(PostContext);
    const [artSearchResult, setArtSearchResult] = useState([])
    const [eventSearchResult, setEventSearchResult] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filteredArts = arts.filter((art) =>
            art?.name.toLowerCase().includes(text.toLowerCase())
        );
        setArtSearchResult(filteredArts);
        const filteredEvents = events.filter((event) =>
            event?.name.toLowerCase().includes(text.toLowerCase())
        );
        setEventSearchResult(filteredEvents);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        {/* <TouchableOpacity style={styles.filterButton}>
                            <Ionicons name="options-outline" size={24} color="black" />
                        </TouchableOpacity> */}
                        <View style={styles.greetingContainer}>
                            <Text style={styles.greetingText}>Hello, {state?.user?.name.toUpperCase()}</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={{ uri: state?.user?.image ? state?.user?.image : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png" }} style={styles.profileIcon} />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchBarContainer}>
                        <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search artist..."
                            placeholderTextColor="gray"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>

                    {/* Popular Art Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Popular Art</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('ArtList') }}>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScrollView}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        {searchQuery === '' ? (
                            arts.length === 0 ? (
                                <Text style={styles.noArtsMessage}>No arts available.</Text>
                            ) : (
                                arts.map((art, index) => (
                                    <PopularArtCard key={index} art={art} navigation={navigation} />
                                ))
                            )
                        ) : (
                            artSearchResult.length === 0 ? (
                                <Text style={styles.noArtsMessage}>No arts found for "{searchQuery}"</Text>
                            ) : (
                                artSearchResult.map((art, index) => (
                                    <PopularArtCard key={index} art={art} navigation={navigation} />
                                ))
                            )
                        )}
                    </ScrollView>

                    {/* Exhibitions Section */}
                    <View style={styles.exhibitionsHeader}>
                        <Text style={styles.sectionTitle}>Exhibitions</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('EventList') }}>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.exhibitionsScrollView}>
                        {searchQuery === '' ? (
                            events.length === 0 ? (
                                <Text style={styles.noArtsMessage}>No exhibitions available.</Text>
                            ) : (
                                events.map((event, index) => (
                                    <ExhibitionCard key={index} event={event} navigation={navigation} />
                                ))
                            )
                        ) : (
                            eventSearchResult.length === 0 ? (
                                <Text style={styles.noArtsMessage}>No exhibitions found for "{searchQuery}"</Text>
                            ) : (
                                eventSearchResult.map((event, index) => (
                                    <ExhibitionCard key={index} event={event} navigation={navigation} />
                                ))
                            )
                        )}
                    </View>

                </View>
            </ScrollView>
            <FooterMenu />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 5,
        backgroundColor: 'lightgrey',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
        color: 'gray',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    noArtsMessage: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    horizontalScrollView: {
        marginBottom: 20,
    },
    scrollViewContent: {
        paddingRight: 10,
    },
    exhibitionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    seeAllText: {
        color: 'blue',
    },
    exhibitionsScrollView: {
        marginBottom: 20,
    },
});

export default Explore;
