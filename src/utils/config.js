import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a function to get the token from AsyncStorage
const getToken = async () => {
  try {
    return await AsyncStorage.getItem('USER_TOKEN');
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw error;
  }
};

// Define a function to generate the config object with the token
export const getConfigWithToken = async () => {
  try {
    const token = await getToken();
    console.log("token",token);
    const jsonObject = await JSON.parse(token);
    console.log("tokenjson",jsonObject);
    const config = {
      headers: {
        Authorization: jsonObject ? `Bearer ${jsonObject}` : '',
        Accept: 'application/json',
      },
    };
    return config;
  } catch (error) {
    console.error('Error generating config:', error);
    throw error;
  }
};
