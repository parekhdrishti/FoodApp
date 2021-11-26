import React from 'react'
import {View, Text, StyleSheet} from 'react-native' 
import Header from './../components/header.js'
import FoodPref from '../components/foodpref'
import MailPref from '../components/mailpref.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Button} from 'react-native-paper'


export default class Preference extends React.Component{
    
    save_prefs = () => {

    }

    render(){
        return(
            <View>
                <Header title="Preferences"></Header>
                <FoodPref/>
                <MailPref/>
                <View style={styles.button_container}>
                    <Button mode="contained" color={colors.login_button_color} style={styles.login_button} onPress={this.save_prefs}>Save</Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    login_button:{
        marginHorizontal:wp('10%'),
        marginVertical:hp('2%')
    },

})

const colors = {
    login_button_color:"#1e4f74",
}