import * as React from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView} from 'react-native'
import {Button, TextInput, ActivityIndicator} from 'react-native-paper'
import Header from './../components/header.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'

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

    validate = () => {
        const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/
        const phoneRegx = /^[\d]{10}$/
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
        }
    }

    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    signup = async () =>{
        this.validate()
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
                            <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.signup}>Signup</Button>
                            {/* <Button mode="contained" color={colors.clear_button_color} style={styles.clear_button} disabled={this.state.disableCLear} onPress={this.clear}>Clear</Button> */}
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
                                <Text style={{fontSize:17 , color:"#7d0633"}}>LOGIN</Text>
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

const mapStateToProps = state =>(
    {
        
    }
)

export default connect(null, null)(Signup)

//style OBJECTS
const styles = StyleSheet.create({
    input:{
        paddingHorizontal:wp('3%'),
        paddingVertical:hp('2%')
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
    email_theme: { colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    password_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    name_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    phone_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
}

const colors = {
    login_button_color:"#1e4f74",
    clear_button_color:"#1e4f74",
}