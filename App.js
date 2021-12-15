import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Button,
} from "react-native";
import {
  NativeBaseProvider,
  HStack,
  IconButton,
  Icon,
  Text,
  Center,
  Box,
  StatusBar,
  Heading,
  AspectRatio,
  Image,
  Stack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
export default function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [url, setUrl] = useState("");
  const [time, setTime] = useState("");
  const apiKey = "363a0329911c1b074081245aae1023c3";

  function getWeather() {
    var today = new Date();
    var t =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setTime(t);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      )
      .then((resp) => {
        console.log("resp: ", resp.data);
        setWeatherData(resp.data);
        if (resp.data.weather[0].description == "smoke") {
          setUrl(
            "https://cff2.earth.com/uploads/2018/11/13015448/what-is-haze.jpg"
          );
        } else if (resp.data.weather[0].description == "clear sky") {
          setUrl(
            "https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618__480.jpg"
          );
        } else if (
          resp.data.weather[0].description == "few clouds" ||
          "clouds"
        ) {
          setUrl(
            "https://image.shutterstock.com/image-photo/few-random-white-clouds-blue-260nw-1780046486.jpg"
          );
        } else if (
          resp.data.weather[0].description == "scattered clouds" ||
          "clouds"
        ) {
          setUrl(
            "https://previews.123rf.com/images/tcareob72/tcareob721509/tcareob72150900092/46100501-blue-sky-with-scattered-clouds-.jpg"
          );
        } else if (
          resp.data.weather[0].description == "broken clouds" ||
          "clouds"
        ) {
          setUrl(
            "https://i1.sndcdn.com/artworks-000187452985-0qggy2-t500x500.jpg"
          );
        } else if (resp.data.weather[0].description == "shower rain") {
          setUrl(
            "https://photo-cdn.urdupoint.com/media/2018/06/_3/420x350/pic_1529566309.jpg"
          );
        } else if (resp.data.weather[0].description == "rain") {
          setUrl(
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOyDgtGwIhvpUyOxcOTs4pHLw8SGx9q5FHEg&usqp=CAU"
          );
        } else if (resp.data.weather[0].description == "thunderstorm") {
          setUrl(
            "https://images.unsplash.com/photo-1600323847785-fe21bc36acdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFpbiUyQyUyMHRodW5kZXJzdG9ybXxlbnwwfHwwfHw%3D&w=1000&q=80"
          );
        } else if (resp.data.weather[0].description == "snow") {
          setUrl(
            "https://static01.nyt.com/images/2019/11/26/us/26holiday-weather01sub/26holiday-weather01sub-mobileMasterAt3x.jpg"
          );
        } else if (resp.data.weather[0].description == "mist") {
          setUrl(
            "https://images.unsplash.com/photo-1559759748-029511daa8aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80"
          );
        }
      });
  }
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <StatusBar backgroundColor="#24292E" barStyle="light-content" />

        <HStack
          bg="#24292E"
          px="1"
          py="3"
          justifyContent="space-around"
          alignItems="center"
        >
          <HStack space="4" alignItems="center">
            {/* <IconButton icon={<Icon size="sm" as={<MaterialIcons name='menu' />} color="white" />} /> */}
            <Text color="white" fontSize="20" fontWeight="bold">
              Weather App
            </Text>
          </HStack>
          <HStack space="2">
            <IconButton
              icon={
                <Icon
                  as={<MaterialIcons name="favorite" />}
                  size="sm"
                  color="white"
                />
              }
            />
          </HStack>
        </HStack>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={setCityName}
            placeholder="Enter city name"
            value={cityName}
            keyboardType="default"
          />

          <Button
            style={styles.button}
            title="Search"
            onPress={getWeather}
            color="#24292E"
          />
        </View>
        {weatherData?.main?.temp ? (
          <View style={styles.card}>
            <Box
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 5,
                borderWidth: 5,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Box>
                <img src={url} />
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {weatherData?.main?.temp
                      ? `${weatherData?.name} ${weatherData?.main?.temp} °C`
                      : "Enter city name to search weather"}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: "violet.500",
                    }}
                    _dark={{
                      color: "violet.400",
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    {weatherData?.weather[0]?.main} | humidity:{" "}
                    {weatherData?.main?.humidity}%
                  </Text>
                </Stack>
                <Text fontWeight="400">
                  Description: {weatherData?.weather[0]?.description}
                </Text>
                <Text fontWeight="400">
                  Max Temperature: {weatherData?.main?.temp_max} °C
                </Text>
                <Text fontWeight="400">
                  Min Temperature: {weatherData?.main?.temp_min} °C
                </Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="400"
                    >
                      Data is from time: {time}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </View>
        ) : (
          <Stack space={2}>
            <Heading
              size="md"
              ml="-1"
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              Enter city name to search weather
            </Heading>
          </Stack>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 5,
    margin: 12,
  },
  input: {
    height: 40,
    borderWidth: 2,
    padding: 10,
  },
  button: {
    margin: 10,
  },
  card: {
    padding: 5,
    margin: 10,
  },
});
