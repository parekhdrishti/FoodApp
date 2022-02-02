import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button, TextInput, ActivityIndicator} from 'react-native-paper'
import Header from '../components/header'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { signup_api, otp_api, update_user_api } from '../api/api';
import {connect} from 'react-redux'
import { api_bool } from '../redux/action';
import colours from './../colours/colour'

class ForgotPassword extends React.Component{
    state={
        password: "",
        confirm: "",
        error: ""
    }

    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    showToast = (msg, type='success') => {
        Toast.show({
          type: type,
          text1: msg,
        });
    }

    update_password = async () =>{
        this.setState({error: ""})
        if(this.state.password.trim() === "" || this.state.confirm.trim() === ""){
            this.setState({error: "Fill all details"})
        }else{
            if(this.state.password === this.state.confirm){
                if(this.state.password.length<8){
                    this.setState({error: "password must be of minimum 8 characters"})
                }else{
                    try{
                        this.props.set_api_bool(true)
                        let response = await update_user_api(this.props.route.params.token, {"password": this.state.password})
                        let status = response.status
                        if(status === 200){
                            this.props.navigation.navigate("Login")
                        }else{
                            this.showToast("Network Error!", "error")
                        }
                        this.props.set_api_bool(false)
                    }catch(e){
                        console.log(e)
                        console.log(e.stack)
                        this.showToast("Network Error!", "error")
                        this.props.set_api_bool(false)
                    }
                }
            }else{
                this.setState({error:"passwords don't match"})
            }
        }
    }

    render(){
        return(
            <View>
                <Header title="Change Password"/>
                <View style={styles.container}>
                    <TextInput secureTextEntry={true} label="Password" style={styles.input} theme={themes.email_theme} keyboardType="default" mode="outlined" value={this.state.password.trim()} onChangeText={this.getHandler('password')}/>
                    <TextInput secureTextEntry={true} label="Confirm Password" style={styles.input} theme={themes.email_theme} keyboardType="default" mode="outlined" value={this.state.confirm.trim()} onChangeText={this.getHandler('confirm')}/>
                </View>
                <View style={styles.button_container}>
                    <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.update_password}>Update</Button>
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
    api: state.api,
    user: state.user
})
export default connect(msp, {set_api_bool: api_bool})(ForgotPassword)

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
    email_theme: { colors: { primary: colours["col-5"],underlineColor:'transparent',}},
    password_theme:{ colors: { primary: colours["col-5"],underlineColor:'transparent',}},
}

const colors = {
    login_button_color:colours["col-5"],
    clear_button_color:colours["col-5"],
}