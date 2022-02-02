import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Header from '../components/header'
import { otp_api } from '../api/api'
import Toast from 'react-native-toast-message';
import colours from './../colours/colour'

export default class OTP extends React.Component{
    state = {
        otp: "",
        error: "",
        code: this.props.route.params.otp,
        token: this.props.route.params.token
    }

    showToast = (msg, type="success") => {
        Toast.show({
          type: type,
          text1: msg,
        });
    }

    generate_otp = () => {
        let generated = Math.floor(1000 + Math.random() * 9000);
        return generated
    }
    
    send_otp_api_call = async (to_email, otp) => {
        let response = await otp_api(to_email, "OTP", otp)
        let status = response.status
        console.log("response")
        return [status,response]
    }

    resend = async () => {
        let val = this.generate_otp()
        let obj = this.props.route.params
        let otp_stat = await this.send_otp_api_call(obj.email, val)
        console.log(val)
        if(otp_stat[0] === 200){
            let text = JSON.parse(await otp_stat[1].text())
            this.showToast("Mail sent!")
            this.setState({code: val, token: text["token"]})
        }else{
            this.showToast("Couldn't send mail. Try again later.", "error")
        }
    }

    render(){
        return(
            <View>
                <Header title="OTP"/>
                <OTPInputView
                        style={{width: '80%', height: 200, alignSelf:'center', color: "#000"}}
                        pinCount={4}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                        autoFocusOnLoad
                        placeholderTextColor = "#000"
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled = {(code => {
                            if(this.state.code.toString() === code){
                                this.props.navigation.navigate("ForgotPassword", {"token": this.state.token})
                            }else{this.setState({error: "otp validation failed"})}
                        })}
                />
                {this.state.error !== "" ? (
                        <View style={styles.error_container}>
                            <Text style={styles.errors}>{this.state.error}</Text>
                        </View>
                    ) : (
                        <View></View>
                    )}

                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.resend}>
                        <Text style={{fontSize:15 , color:"#aeaeae"}}>RESEND</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45
    },
   
    borderStyleHighLighted: {
      borderColor: "#000",
    },
   
    underlineStyleBase: {
      color: colours["col-3"],
      borderColor: "#131313"
    },
   
    underlineStyleHighLighted: {
      borderColor: "#131313",
    },
    error_container:{
        alignItems: 'center'
    },
    errors: {
        fontSize: 13,
        color: "#ff0000"
    }
  });