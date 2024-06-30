import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import RestaurantCard from './RestaurantCard';
import { RestaurantType } from '../api/restaurantApi';

type RestaurantListProps = {
  restaurants: RestaurantType[];
};

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {restaurants.length > 1 && (
        <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
          <Text style={styles.expandButtonText}>
            {isExpanded ? "折りたたむ" : "もっと見る"}
          </Text>
        </TouchableOpacity>
      )}
      {restaurants.length > 0 && <RestaurantCard restaurant={restaurants[0]} />}
      {restaurants.length > 1 && (
        <Animated.View style={[styles.expandableContent, { maxHeight }]}>
          {restaurants.slice(1).map((restaurant) => (
            <RestaurantCard key={restaurant.google_place_id} restaurant={restaurant} />
          ))}
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  expandButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  expandButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  expandableContent: {
    overflow: 'hidden',
  },
});

export default RestaurantList;