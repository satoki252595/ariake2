import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RestaurantType } from '../api/restaurantApi';

type RestaurantCardProps = {
  restaurant: RestaurantType;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{restaurant.name}</Text>
    <Text style={styles.date}>{restaurant.location_name}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default RestaurantCard;