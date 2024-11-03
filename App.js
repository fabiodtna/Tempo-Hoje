import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imgtemp, SetTempimg] = useState('');

  const API_KEY = 'a8bf13a33fb6814a83269d1d804c4c28'; 

  const fetchWeather = async () => {
    if (!city) return Alert.alert('Error', 'Adicone uma cidade existente!.');

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      SetTempimg(response.data.weather[0].icon)
    } catch (err) {
      setError('Erro ao encontrar a cidade!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkyAlert</Text>
      <TextInput
        style={styles.input}
        placeholder="Escolha uma cidade!"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button}  onPress={fetchWeather}>
        <Text style={styles.buttonText}>Tempo Hoje</Text>
      </TouchableOpacity>
      
      {loading && <Text style={styles.loading}>Loading...</Text>}
      
      {error && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.weatherInfo}>
          <Image source={{ uri:  `https://openweathermap.org/img/wn/${imgtemp}@2x.png` }} style={{ width: 100, height: 100 }} />
          <Text style={styles.city}>{weather.name} {weather.sys.country}</Text>
          <Text style={styles.temp}>Tempo Agora: {weather.main.temp}°C</Text>
          <Text style={styles.temp}>Sensação termica: {weather.main.feels_like}</Text>
          <Text style={styles.temp}>Umidade: {weather.main.humidity}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#87CEFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor:'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,                
    borderRadius: 5,           
    elevation: 3,              
    shadowColor: '#000',       
    shadowOffset: {           
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,        
    shadowRadius: 2,         
  },
  buttonText: {
    color: '#fff',            
    fontSize: 18,              
    textAlign: 'center',       
  },
  loading: {
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 18,
  },
});

export default App;
