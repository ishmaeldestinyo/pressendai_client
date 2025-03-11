 export const JSONParser = (data) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    }
    return data; // If it's already an object, return as-is
  };