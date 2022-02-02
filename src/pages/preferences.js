import React from 'react'
import {View, Text, StyleSheet} from 'react-native' 
import Header from './../components/header.js'
import FoodPref from '../components/foodpref'
import MailPref from '../components/mailpref.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Button} from 'react-native-paper'
import {connect} from 'react-redux'
import {update_user_redux_api_call} from './../redux/action'
import colours from './../colours/colour'

class Preference extends React.Component{
    
    save_prefs = () => {
        let token = this.props.user.token
        let f = this.props.user.user_data["foodPreference"]
        let e =this.props.user.user_data["emailPreference"]
        this.props.update_user_redux_api_call(token, {foodPreference: f, emailPreference: e})
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

const msp = state => ({
    user: state.user
})

export default connect(msp,{update_user_redux_api_call: update_user_redux_api_call})(Preference)

const styles = StyleSheet.create({
    login_button:{
        marginHorizontal:wp('10%'),
        marginVertical:hp('2%')
    },

})

const colors = {
    login_button_color:colours["col-5"]
}