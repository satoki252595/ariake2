// api/eventApi.ts

export type EventType = {
    id: string;
    name: string;
    start_date: string;
  };
  
  export const getEvents = async (): Promise<EventType[]> => {
    try {
      const response = await fetch('http://localhost:3000/ariake_arena_events');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };