import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images, dummyData} from '../constants';

const COUNTRY_ITEM_SIZE = SIZES.width / 3;

const Dashboard = ({navigation}) => {
  const countryScrollX = useRef(new Animated.Value(0)).current;
  const [countries, setCountries] = useState([
    {id: -1},
    ...dummyData.countries,
    {id: -2},
  ]);

  const renderAppHeader = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* menu */}
        <View>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={icons.side_drawer}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* title */}
        <View>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}>
            Title
          </Text>
        </View>
        {/* profile */}
        <View>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={images.profile_pic}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCountries = () => {
    return (
      <Animated.FlatList
        horizontal
        data={countries}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={COUNTRY_ITEM_SIZE}
        scrollEventThrottle={16}
        decelerationRate={0}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event([{
            nativeEvent : { contentOffset : { x : countryScrollX } }
        }] , { useNativeDriver:false })}

        renderItem={({item, index}) => {
          opacityAnimate = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          mapSizeAnimate = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [25, Platform.OS === 'ios' ? 80 : 60, 25],
            extrapolate: 'clamp',
          });
          fontSizeAnimate = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [15, 25, 15],
            extrapolate: 'clamp',
          });
          if (index == 0 || index == countries.length - 1) {
            return (
              <View
                style={{
                  width: COUNTRY_ITEM_SIZE,
                }}
              />
            );
          } else {
            return (
              <Animated.View
                opacity={opacityAnimate}
                style={{
                  width: COUNTRY_ITEM_SIZE,
                  height: 130,
                  alignItems: 'center',
                  justifyContent:'center',
                }}>
                <Animated.Image
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    width: mapSizeAnimate,
                    height: mapSizeAnimate,
                    tintColor: COLORS.white,
                  }}
                />
                <Animated.Text
                    style={{
                        color:COLORS.white,
                        ...FONTS.h2,
                        fontSize:fontSizeAnimate
                    }}
                >
                    {item.name}
                </Animated.Text>
              </Animated.View>
            );
          }
        }}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      <StatusBar backgroundColor={COLORS.black} barStyle="light-content" />
      {/* header */}
      {renderAppHeader()}
      <ScrollView
        contentContainerStyle={{marginBottom: Platform.OS === 'ios' ? 30 : 0}}>
        <View style={{height: 700}}>
          {/* countries lists*/}
          {renderCountries()}
          {/* places lists */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
