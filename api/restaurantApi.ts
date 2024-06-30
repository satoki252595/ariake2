// api/restaurantApi.ts

export type RestaurantType = {
    google_place_id: string;
    name: string;
    location_name: string;
  };
  
  export const getRestaurants = async (): Promise<RestaurantType[]> => {
    try {
      const response = await fetch('http://localhost:3000/restaurant_details');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  };