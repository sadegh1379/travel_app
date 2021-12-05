import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ImageBackground, Image, Button} from 'react-native';
import {NavbarHeader, TextButtonIcon} from '../components';
import {COLORS, SIZES, icons, FONTS} from '../constants';
import SlidingUpPanel from 'rn-sliding-up-panel';

const Place = ({navigation, route}) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  let _panel = useRef(null);
  useEffect(() => {
    const {selectedPlace} = route.params;
    setSelectedPlace(selectedPlace);
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
        showBackdrop={false}
        snappingPoints={[SIZES.height + 100]}
        height={SIZES.height + 100}
        friction={0.6}>
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
              alignItems :'center',
              justifyContent:'center'
            }}>
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
