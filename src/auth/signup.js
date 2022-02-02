import * as React from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView} from 'react-native'
import {Button, TextInput, ActivityIndicator} from 'react-native-paper'
import Header from './../components/header.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'
import { add_login_error, signup_redux_api_call } from '../redux/action.js';
import colours from './../colours/colour'

class Signup extends React.Component{
    state = {
        email:"",
        password:"",
        name: "",
        phone: "",
        confirm: "",
        loading: false,
        hidePassword: true,
        disableLogin:true,
        disableCLear:true,
        error: ""
    }

    clearDisableHandler = () => {
        if(this.state.email ==="" && this.state.password === ""){
            this.setState({disableCLear:true})
        }else{
            this.setState({disableCLear:false})
        }
    }

    loginDisableHandler = () => {
        if(this.state.email!=="" && this.state.password !== "" && this.state.confirm !== "" && this.state.name !== "" && this.state.phone !== ""){
            this.setState({disableLogin:false})
        }else{
            this.setState({disableLogin:true})
        }
    }

    componentDidUpdate = (prevProps , prevState)=>{
        if(prevState.email !== this.state.email || prevState.password !== this.state.password || prevState.confirm !== this.state.confirm || prevState.phone !== this.state.phone || prevState.name !== this.state.name){
            this.clearDisableHandler()
            this.loginDisableHandler()
        }
    }

    validate = async () => {
        const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/
        const phoneRegx = /^[7,8,9][\d]{9}$/
        const nameRegx = /([a-zA-Z]+\s*)*/
        // && passwordRegx.exec(this.state.password.toString())
        if(!emailRegx.exec(this.state.email.toString().toLowerCase())){
            this.setState({error: "enter valid email!"})
        }else if(!passwordRegx.exec(this.state.password.toString())){
            this.setState({error: "password must be atleast 8 characters long!"})
        }else if(!phoneRegx.exec(this.state.phone)){
            this.setState({error: "enter valid phone number!"})
        }else if(this.state.confirm!==this.state.password){
            this.setState({error: "passwords don't match!"})
        }else{
            this.setState({error: ""})
            this.props.signup_redux_api_call(this.state.name, this.state.email, this.state.password, this.state.phone, "both", true)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.user.signup !== undefined){
            if(nextProps.user.signup.bool){
                nextProps.navigation.navigate('Login')
            }else{
                return {
                    error: nextProps.user.signup.error,
                  }
            }
        }
        return null
    }

    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    signup = async () =>{
        await this.validate()
        //do an initial signup
    }

    login_press = () => {
        this.props.navigation.navigate("Login")
    }

    render(){
        return(
            <View>
                <Header title="Signup"/>
                <ScrollView>
                        <View style={styles.container}>
                            <TextInput label="Name" style={styles.input} theme={themes.name_theme} keyboardType="default" mode="outlined" value={this.state.name.trim()} onChangeText={this.getHandler('name')}/>
                            <TextInput label="Email" style={styles.input} theme={themes.email_theme} keyboardType="default" mode="outlined" value={this.state.email.trim()} onChangeText={this.getHandler('email')}/>
                            <TextInput label="Phone" style={styles.input} theme={themes.phone_theme} keyboardType="numeric" mode="outlined" value={this.state.phone.trim()} onChangeText={this.getHandler('phone')}/>
                            <TextInput label="Password" secureTextEntry={this.state.hidePassword} style={styles.input} theme={themes.password_theme} keyboardType="default" mode="outlined" value={this.state.password.trim()} onChangeText={this.getHandler('password')}/>
                            <TextInput label="Confirm Password" secureTextEntry={this.state.hidePassword} style={styles.input} theme={themes.password_theme} keyboardType="default" mode="outlined" value={this.state.confirm.trim()} onChangeText={this.getHandler('confirm')}/>
                        </View>

                        <View style={styles.button_container}>
                            <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.signup}>SignUp</Button>
                        </View>

                        {this.state.error !== "" ? (
                            <View style={styles.error_container}>
                                <Text style={styles.errors}>{this.state.error}</Text>
                            </View>
                        ) : (
                            <View></View>
                        )}

                        <View style={{alignItems:'center' , marginTop:15}}>
                            <TouchableOpacity onPress={this.login_press}>
                                <Text style={{fontSize:17 , color:colours["col-3"]}}>LOGIN</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize:12 , color:"#aeaeae"}}>(Already have an account?)</Text>
                        </View>
                        
                        {/* <View>
                            <ActivityIndicator animating={this.props.log} color="#1e5f74" size="large" />
                        </View> */}
                </ScrollView>
            </View>
        )
    }
}

const msp = state => (
    {
        user : state.user
    }
)

export default connect(msp, {signup_redux_api_call: signup_redux_api_call, add_login_error: add_login_error})(Signup)

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
        marginTop:hp('4%')
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
    name_theme: { colors: { primary: colours["col-5"],underlineColor:'transparent',}},
    phone_theme:{ colors: { primary: colours["col-5"],underlineColor:'transparent',}},
}

const colors = {
    login_button_color:colours["col-5"],
    clear_button_color:colours["col-5"],
}