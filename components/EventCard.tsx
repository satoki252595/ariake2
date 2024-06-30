import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { EventType } from '../api/eventApi';

type EventCardProps = {
  event: EventType;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{event.name}</Text>
    <Text style={styles.date}>{event.start_date}</Text>
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

export default EventCard;