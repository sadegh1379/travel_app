import React , {useState , useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground
} from 'react-native';
import { NavbarHeader } from '../components';
import { COLORS , SIZES , icons , FONTS } from '../constants';


const Place = ({navigation , route}) => {

    const [selectedPlace , setSelectedPlace] = useState(null)

    useEffect(()=>{
        const {selectedPlace} = route.params
        setSelectedPlace(selectedPlace) 
    },[])

    const renderPlace = ()=>{
        return(
            <ImageBackground
                source={selectedPlace?.image}
                style={{
                    width :'100%',
                    height : '100%'
                }}
            >
                <NavbarHeader
                    
                    leftOnPress={()=>navigation.goBack()}
                    right={false}
                    customContainerStyle={{
                        marginTop  : SIZES.base * 2
                    }}
                />
            </ImageBackground>
        )
    }
    return (
        <View>
            {/* place */}
            {renderPlace()}
        </View>
    )
}

export default Place;