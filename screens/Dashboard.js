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
import { TextButton } from '../components';
import {COLORS, FONTS, SIZES, icons, images, dummyData} from '../constants';

const COUNTRY_ITEM_SIZE = SIZES.width / 3;
const PLACE_ITEM_SIZE = Platform.OS === 'ios' ? SIZES.width / 1.25 : 
                                 SIZES.width / 1.2
const  EMPTY_PLACE_ITEM = (SIZES.width - PLACE_ITEM_SIZE) / 2

const Dashboard = ({navigation}) => {

  const countryScrollX = useRef(new Animated.Value(0)).current;
  const placeScrollX = useRef(new Animated.Value(0)).current;

  const [countries, setCountries] = useState([
    {id: -1},
    ...dummyData.countries,
    {id: -2},
  ]);
  const [places , setPlaces] = useState([
    {id : -1},
    ...dummyData.countries[0].places,
    {id : -2}
  ])

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
        onMomentumScrollEnd={(event)=>{
          // get position
          let position = (event.nativeEvent.contentOffset.x / COUNTRY_ITEM_SIZE).toFixed(0)
          //set place
          setPlaces([
            {id : -1},
            ...dummyData.countries[position].places,
            {id : -2}
          ]) 
        }}
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

  const renderPlaces = ()=>{
    return(
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={places}
        keyExtractor={item =>`${item.id}`}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={Platform.OS === 'ios' ? PLACE_ITEM_SIZE +25 : PLACE_ITEM_SIZE}
        contentContainerStyle={{
          alignItems:'center'
        }}
        scrollEventThrottle={16}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event([{
          nativeEvent : { contentOffset : {x : placeScrollX} }
        }] , { useNativeDriver:false })}
        renderItem={({item , index})=>{
          let placeOpacityAnimate = placeScrollX.interpolate({
            inputRange : [
              (index-2) * PLACE_ITEM_SIZE,
              (index - 1) * PLACE_ITEM_SIZE,
              index * PLACE_ITEM_SIZE
            ],
            outputRange : [0.3,1,0.3],
            extrapolate:'clamp'
          })
          let activeHeight = 0
          if(Platform.OS === 'ios'){
            if(SIZES.height > 800){
              activeHeight = SIZES.height / 2
            }else{
              activeHeight = SIZES.height / 1.65
            }
          }else{
            activeHeight = SIZES.height / 1.8
          }

          const placeHeightAnimate = placeScrollX.interpolate({
            inputRange : [
              (index-2) * PLACE_ITEM_SIZE,
              (index - 1) * PLACE_ITEM_SIZE,
              index * PLACE_ITEM_SIZE
            ],
            outputRange : [SIZES.height / 2.25 , activeHeight , 
              SIZES.height / 2.25],
            extrapolate:'clamp'
          })
          if(index == 0 || index == places.length - 1){
            return(
              <View
                style={{
                  width : EMPTY_PLACE_ITEM,
                }}
              />
            )
          }else{
            return(
              <Animated.View
                opacity={placeOpacityAnimate}
                style={{
                  alignItems: 'center',
                  height : placeHeightAnimate,
                  width : PLACE_ITEM_SIZE,
                  padding : 10,
                  borderRadius : 30
                }}
              >
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    position:'absolute',
                    width : '100%',
                    height : '100%',
                    borderRadius : 30,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent:'flex-end',
                    alignItems:'center',
                    marginHorizontal : SIZES.padding
                  }}
                >
                  <Text
                    style={{
                      color:COLORS.white,
                      ...FONTS.h1,
                      marginBottom:SIZES.radius
                    }}
                  >{item.name}</Text>
                  <Text
                    style={{
                      color:COLORS.white,
                      ...FONTS.body3,
                      textAlign:'center',
                      marginBottom:SIZES.padding
                    }}
                  >
                    {item.description}
                  </Text>
                  <TextButton
                    onPress={()=>
                      // console.log(item)
                      navigation.navigate('Place' , {selectedPlace : item})
                    }
                    title="Explore"
                    customBtnStyle={{
                      padding : 10,
                      width : 150,
                      marginBottom : -10
                    }}
                  />
                </View>
              </Animated.View>
            )
          }
        }}
      />
    )
  }

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
          <View
            style={{height : Platform.OS==='ios' ? 500 : 550 }}
          >
            {renderPlaces()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
