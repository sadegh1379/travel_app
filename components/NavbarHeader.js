import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, icons , FONTS} from '../constants';

const NavbarHeader = ({leftOnPress, right, title, customContainerStyle}) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
        ...customContainerStyle,
      }}>
      {/* left */}
      <View style={{alignItems: 'flex-start'}}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.transparentBlack,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
          }}
          onPress={leftOnPress}>
          <Image
            source={icons.left_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
      {/* title */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text 
             style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}
        >{title}</Text>
      </View>
      {/* right */}
      {right && (
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.transparentBlack,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}>
            <Image
              source={icons.settings}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NavbarHeader;
