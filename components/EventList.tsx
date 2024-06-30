import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import EventCard from './EventCard';
import { EventType } from '../api/eventApi';

type EventListProps = {
  events: EventType[];
};

const EventList: React.FC<EventListProps> = ({ events }) => {
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
      {events.length > 1 && (
        <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
          <Text style={styles.expandButtonText}>
            {isExpanded ? "折りたたむ" : "もっと見る"}
          </Text>
        </TouchableOpacity>
      )}
      {events.length > 0 && <EventCard event={events[0]} />}
      {events.length > 1 && (
        <Animated.View style={[styles.expandableContent, { maxHeight }]}>
          {events.slice(1).map((event) => (
            <EventCard key={event.id} event={event} />
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

export default EventList;