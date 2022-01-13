import * as React from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity} from 'react-native'
import {Button, TextInput, ActivityIndicator} from 'react-native-paper'
import Header from './../components/header.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'
import {clear_user_data, login_redux_api_call, signup_bool } from '../redux/action.js';
import { mail_api } from '../api/api.js';
import Toast from 'react-native-toast-message';

class RequestRecipe extends React.Component{
    state = {
        recipe_title:"",
        additional_notes:"",
        loading: false,
        hidePassword: true,
        disableLogin:false,
        error: "",
        ack: "",
        rerender: true
    }

    showToast = (msg, type="success") => {
        Toast.show({
          type: type,
          text1: msg,
        });
    }

    send_mail = async () => {
        let add_n = this.state.additional_notes === "" ? "none" : this.state.additional_notes
        try{
            let response = await mail_api("app.kitchengenie@gmail.com", this.props.user.user_data.email, this.props.user.user_data.mobile, this.props.user.user_data.name, this.state.recipe_title, add_n, `RECIPE REQUEST`)
            let status = response.status 
            console.log(status)
            if(status === 200){
                this.showToast("Mail sent!")
            }else{  
                this.showToast("Network Error!", "error")
            }
        }catch(e){
            console.log(e)
            console.log(e.stack)
            this.showToast("Network Error!", "error")
        }
    }


    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    clear = () => {
        this.setState({email:"" , password:""})
    }

    request = async () =>{
        await this.send_mail()
    }

    render(){   
        return(
            <View>
                <Header title="Request Recipe"/>
                <KeyboardAvoidingView style={styles.center_data}>
                    <View style={styles.container}>
                        <TextInput label="Recipe Title" style={styles.input} theme={themes.email_theme} keyboardType="default" mode="outlined" value={this.state.recipe_title} onChangeText={this.getHandler('recipe_title')}/>
                        <TextInput multiline={true} label="Additional Notes" style={styles.input_additional_notes} theme={themes.password_theme} keyboardType="default" mode="outlined" value={this.state.additional_notes} onChangeText={this.getHandler('additional_notes')}/>
                    </View>

                    <View style={styles.button_container}>
                        <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.request}>Request</Button>
                    </View>

                    {this.state.error !== "" ? (
                        <View style={styles.error_container}>
                            <Text style={styles.errors}>{this.state.error}</Text>
                        </View>
                    ) : (
                        <View></View>
                    )}

                    {this.state.ack !== "" ? (
                            <View style={styles.ack_container}>
                                <Text style={styles.ack}>{this.state.ack}</Text>
                            </View>
                    ) : (
                        <View></View>
                    )}
                    
                    <View style={{marginTop: 20}}>
                        <ActivityIndicator animating={this.props.api} color="#1e5f74" size="small" />
                    </View>

                </KeyboardAvoidingView>
            </View>
        )
    }
}

const msp = state =>(
    {
        user: state.user,
        api: state.api 
    }
)

export default connect(msp, {clear_user_data: clear_user_data, signup_bool: signup_bool, login_redux_api_call:login_redux_api_call})(RequestRecipe)

//style OBJECTS
const styles = StyleSheet.create({
    input:{
        marginHorizontal:wp('3%'),
        marginVertical:hp('2%')
    },
    input_additional_notes:{
        marginHorizontal:wp('3%'),
        marginVertical:hp('2%'),
        height: 200,
        multiline: true
    },
    login_button:{
        marginHorizontal:wp('3%'),
        marginVertical:hp('1.5%')
    },
    clear_button:{
        marginHorizontal:wp('3%'),
        marginVertical:hp('1.5%')
    },
    button_container:{
        justifyContent:'center', 
        marginLeft:wp('12%'), 
        marginRight:wp('12%'), 
        marginTop:hp('3%')
    },
    full_container:{
        flex:1,
    },
    center_data:{
        justifyContent:'center',
        alignContent:'center',
    },
    error_container:{
        alignItems: 'center'
    },
    errors: {
        fontSize: 13,
        color: "#ff0000"
    },
    ack_container:{
        alignItems: 'center'
    },
    ack: {
        fontSize: 13,
        color: "#0000ff"
    }
})

const themes = {
    email_theme: { colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    password_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
}

const colors = {
    login_button_color:"#1e4f74",
    clear_button_color:"#1e4f74",
}