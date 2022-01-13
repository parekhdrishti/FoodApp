import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button, TextInput, ActivityIndicator} from 'react-native-paper'
import Header from '../components/header'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { signup_api, otp_api } from '../api/api';
import {connect} from 'react-redux'
import { api_bool } from '../redux/action';

class PreOTP extends React.Component{
    state={
        email: "",
        error: ""
    }

    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    send_otp_api_call = async (to_email, otp) => {
        let response = await otp_api(to_email, "OTP", otp)
        let status = response.status
        console.log("response")
        return [status,response]
    }

    showToast = (msg, type="success") => {
        Toast.show({
          type: type,
          text1: msg,
        });
    }

    check_email = async () => {
        try{
            this.setState({error: ""})
            this.props.set_api_bool(true)
            let response = await signup_api("", this.state.email, "", "", "", "")
            let status = response.status 
            if(status === 400){
                let text = JSON.parse(await response.text())
                if(text["error"].trim() === "Email already exists"){
                    let val = this.generate_otp()
                    let otp_stat = await this.send_otp_api_call(this.state.email, val)
                    console.log(otp_stat)
                    if(otp_stat[0] === 200){
                        this.showToast("OTP sent on email")
                        let text = JSON.parse(await otp_stat[1].text())
                        this.props.navigation.navigate("OTP", {"otp":val, "email": this.state.email, "token": text["token"]})
                    }else{
                        this.showToast("Couldn't send mail. Try again later.", "error")
                    }
                }else{
                    this.setState({error: "Email doesn't exist"})
                }
            }
            this.props.set_api_bool(false)
        }catch(e){
            console.log(e)
            console.log(e.stack)
            this.showToast("Network Error!.", "error")
            this.props.set_api_bool(false)
        }
    }

    generate_otp = () => {
        let generated = Math.floor(1000 + Math.random() * 9000);
        return generated
    } 

    send_otp = async () => {
        if(this.state.email.trim() === ""){
            this.setState({error: "enter email"})
        }else{
            await this.check_email()
        }
    }

    render(){
        return(
            <View>
                <Header title="Forgot Password"/>
                <View style={styles.container}>
                    <TextInput label="Email" style={styles.input} theme={themes.email_theme} keyboardType="default" mode="outlined" value={this.state.email.toLocaleLowerCase().trim()} onChangeText={this.getHandler('email')}/>
                </View>
                <View style={styles.button_container}>
                    <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.send_otp}>Send OTP</Button>
                </View>
                {this.state.error !== "" ? (
                        <View style={styles.error_container}>
                            <Text style={styles.errors}>{this.state.error}</Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                <View style={{marginTop: 20}}>
                    <ActivityIndicator animating={this.props.api} color="#1e5f74" size="small" />
                </View>
            </View>
        )
    }
}

const msp = state => ({
    api: state.api
})
export default connect(msp, {set_api_bool: api_bool})(PreOTP)

//style OBJECTS
const styles = StyleSheet.create({
    input:{
        marginHorizontal:wp('3%'),
        marginVertical:hp('2%')
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