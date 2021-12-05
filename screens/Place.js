import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ImageBackground, Image, Button, Animated} from 'react-native';
import {NavbarHeader, Rate, TextButton, TextButtonIcon} from '../components';
import {COLORS, SIZES, icons, FONTS} from '../constants';
import {MapStyle} from '../styles';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Place = ({navigation, route}) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [allowDragging_s , setAllowDragging] = useState(true);

  let _panel = useRef(null);
  const _draggedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const {selectedPlace} = route.params;
    setSelectedPlace(selectedPlace);

    // listender
    _draggedValue.addListener((valObj)=>{
        if(valObj.value > SIZES.height){
            setAllowDragging(false)
        }
    })

    return ()=>{
        _draggedValue.removeAllListeners()
    }
  }, []);

  const renderPlace = () => {
    return (
      <ImageBackground
        source={selectedPlace?.image}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <NavbarHeader
          leftOnPress={() => navigation.goBack()}
          right={false}
          customContainerStyle={{
            marginTop: SIZES.base * 2,
          }}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.padding,
            justifyContent: 'flex-end',
          }}>
          {/* head */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.largeTitle,
                marginRight: 10,
              }}>
              {selectedPlace?.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  marginRight: 10,
                }}>
                {selectedPlace?.rate}
              </Text>
              <Image
                source={icons.star}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          </View>
          {/* description */}
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              width: '80%',
              lineHeight: 25,
              marginTop: SIZES.base,
            }}>
            {selectedPlace?.description}
          </Text>
          {/* button */}
          <TextButtonIcon
            title="Book a flight"
            icon={icons.aeroplane}
            customBtnStyle={{
              marginVertical: SIZES.padding * 2,
              marginBottom: 110,
            }}
            customTextStyle={{
              ...FONTS.h2,
            }}
            onPress={() => console.log('')}
          />
        </View>
      </ImageBackground>
    );
  };

  const renderMap = () => {
    return (
      <SlidingUpPanel
        ref={c => (_panel = c)}
        draggableRange={{
          top: SIZES.height + 100,
          bottom: 100,
        }}
        allowDragging={allowDragging_s}
        showBackdrop={false}
        snappingPoints={[SIZES.height + 100]}
        height={SIZES.height + 100}
        friction={0.5}
        onBottomReached={()=>setAllowDragging(true)}
        animatedValue={_draggedValue}
        >
        <View style={{flex: 1}}>
          {/* panel head */}
          <View
            style={{
              backgroundColor: 'transparent',
              alignItems: 'center',
              paddingTop: SIZES.padding,
              height: 100,
            }}>
            <Image
              source={icons.up_arrow}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightGray,
              }}
            />
            <Text
              style={{
                marginTop: 10,
                color: COLORS.lightGray,
                ...FONTS.body4,
              }}>
              SWIPE FOR DETAILS
            </Text>
          </View>

          {/* details */}
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MapView
              style={{
                width: '100%',
                height: '100%',
              }}
              provider={PROVIDER_GOOGLE}
              initialRegion={selectedPlace?.mapInitialRegion}
              customMapStyle={MapStyle}>
              {selectedPlace?.hotels?.map((hotel, index) => (
                <Marker
                  key={index}
                  coordinate={hotel.latlng}
                  identifier={hotel.id}
                  onPress={() => setSelectedHotel(hotel)}>
                  <Image
                    source={
                      selectedHotel?.id === hotel.id
                        ? icons.bed_on
                        : icons.bed_off
                    }
                    resizeMode="contain"
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </Marker>
              ))}
            </MapView>
            <NavbarHeader
              title={selectedPlace?.name}
              leftOnPress={() => _panel.hide()}
              right={true}
              customContainerStyle={{
                position: 'absolute',
                top: 50,
              }}
            />
            {/* details card */}
            <View
              style={{
                position: 'absolute',
                bottom: 50,
                backgroundColor: 'transparent',
                width: '100%',
                paddingHorizontal: SIZES.padding,
              }}>
              {/* title */}
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h1,
                  }}>
                  {selectedHotel?selectedPlace.name : null}
                </Text>
              </View>
              {/* card */}
              {selectedHotel && (
                <View
                  style={{
                    margin: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.transparentBlack1,
                    height: 150,
                    flexDirection:'row'
                  }}>
                      <View
                        style={{
                            alignItems:'center',
                            justifyContent:'center',
                            padding:SIZES.base
                        }}
                      >
                          <Image
                            source={selectedHotel?.image}
                            resizeMode="cover"
                            style={{
                                borderRadius:SIZES.radius,
                                width : 100,
                                height : 130
                            }}
                          />
                      </View>
                      <View
                        style={{
                            padding:SIZES.base + 10,
                            justifyContent:'space-between'

                        }}
                      >
                          <Text
                            style={{
                                color:COLORS.white,
                                ...FONTS.h2
                            }}
                          >{selectedHotel?.name}</Text>
                          {/* starts */}
                          <View >
                            <Rate
                                rate={selectedHotel?.rate}
                            />
                          </View>
                          <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center'
                            }}
                          >
                            <TextButton
                                title="Details"
                                onPress={()=>console.log('details')}
                                customBtnStyle={{
                                    width : 100,
                                    height : 40
                                }}
                            />
                            <Text
                              style={{
                                color:COLORS.lightGray,
                                ...FONTS.body4,
                                marginLeft : 20
                            }}
                            >
                                from ${selectedHotel?.price} / night
                            </Text>
                          </View>
                      </View>
                  </View>
              )}
            </View>
          </View>
        </View>
      </SlidingUpPanel>
    );
  };
  return (
    <View>
      {/* place */}
      {renderPlace()}
      {/* details */}
      {renderMap()}
    </View>
  );
};

export default Place;
