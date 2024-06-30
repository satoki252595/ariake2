import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Header from './components/Header';
import EventList from './components/EventList';
import RestaurantList from './components/RestaurantList';
import { getEvents, EventType } from './api/eventApi';
import { getRestaurants,RestaurantType } from './api/restaurantApi';


const App = () => {
  const [isEventLoading, setEventLoading] = useState(true);
  const [isRestaurantLoading, setRestaurantLoading] = useState(true);
  const [eventData, setEventData] = useState<EventType[]>([]);
  const [restaurantData, setRestaurantData] = useState<RestaurantType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        setEventData(events);
      } catch (error) {
        console.error(error);
      } finally {
        setEventLoading(false);
      }
    };
    fetchEvents();

    const fetchRestaurants = async () => {
      try {
        const restaurants = await getRestaurants();
        setRestaurantData(restaurants);
      } catch (error) {
        console.error(error);
      } finally {
        setRestaurantLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header 
          title="まちブラ" 
          onMenuPress={() => {/* メニュー処理 */}} 
          onSearchPress={() => {/* 検索処理 */}}
        />
        <View style={styles.content}>
          {isEventLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <EventList events={eventData} />
          )}
        </View>
        <View style={styles.content}>
          {isRestaurantLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <RestaurantList restaurants={restaurantData} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4A90E2', // ヘッダーの背景色と同じにする
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
  },
});

export default App;