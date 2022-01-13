import * as React from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity} from 'react-native'
import {Button, TextInput, ActivityIndicator} from 'react-native-paper'
import Header from './../components/header.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'
import {clear_user_data, login_redux_api_call, signup_bool } from '../redux/action.js';

class Login extends React.Component{
    state = {
        email:"",
        password:"",
        loading: false,
        hidePassword: true,
        disableLogin:true,
        disableCLear:true,
        error: "",
        ack: "",
        rerender: true
    }

    clearDisableHandler = () => {
        if(this.state.email ==="" && this.state.password === ""){
            this.setState({disableCLear:true})
        }else{
            this.setState({disableCLear:false})
        }
    }

    loginDisableHandler = () => {
        if(this.state.email!=="" && this.state.password !== ""){
            this.setState({disableLogin:false})
        }else{
            this.setState({disableLogin:true})
        }
    }

    componentDidUpdate = (prevProps , prevState)=>{
        if(prevState.email !== this.state.email || prevState.password !== this.state.password){
            this.clearDisableHandler()
            this.loginDisableHandler()
        }
    }

    validate = () => {
        const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/
        // && passwordRegx.exec(this.state.password.toString())
        if(!emailRegx.exec(this.state.email.toString().toLowerCase())){
            this.setState({error: "enter valid email!"})
        }else if(!passwordRegx.exec(this.state.password.toString())){
            this.setState({error: "password must be atleast 8 characters long!"})
        }else{
            this.setState({error: ""})
            this.props.login_redux_api_call(this.state.email, this.state.password)
        }
    }

    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    clear = () => {
        this.setState({email:"" , password:""})
    }

    login = async () =>{
        this.validate()
    }

    createAccountPress = () => {
        this.props.clear_user_data({})
        this.props.navigation.navigate("Signup")
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.user.login !== undefined){
            if(nextProps.user.login.bool){
                nextProps.navigation.navigate('BottomNavParent')
            }else{
                return {
                    error: nextProps.user.login.error,
                  }
            }
        }
        return null
    }

    render(){
        if(this.props.user.signup !== undefined){
            if(this.props.user.signup.bool === true){
                if(this.state.rerender === true){ 
                    this.setState({ack: "Signup Successful! Login now!"})
                    this.setState({rerender: false})
                }
            }
        }   
        return(
            <View>
                <Header title="Login"/>
                <KeyboardAvoidingView style={styles.center_data}>
                    <View style={styles.container}>
                        <TextInput label="Email" style={styles.input} theme={themes.email_theme} keyboardType="default" mode="outlined" value={this.state.email.trim()} onChangeText={this.getHandler('email')}/>
                        <TextInput label="Password" secureTextEntry={this.state.hidePassword} style={styles.input} theme={themes.password_theme} keyboardType="default" mode="outlined" value={this.state.password.trim()} onChangeText={this.getHandler('password')}/>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PreOTP')}}>
                            <Text style={{fontSize:15 , color:"#aeaeae"}}>FORGOT PASSWORD?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.button_container}>
                        <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.login}>Login</Button>
                        <Button mode="contained" color={colors.clear_button_color} style={styles.clear_button} disabled={this.state.disableCLear} onPress={this.clear}>Clear</Button>
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

                    <View style={{alignItems:'center' , marginTop:15}}>
                        <TouchableOpacity onPress={this.createAccountPress}>
                            <Text style={{fontSize:17 , color:"#7d0633"}}>CREATE ACCOUNT</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:12 , color:"#aeaeae"}}>(Don't have an account?)</Text>
                    </View>
                    
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

export default connect(msp, {clear_user_data: clear_user_data, signup_bool: signup_bool, login_redux_api_call:login_redux_api_call})(Login)

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