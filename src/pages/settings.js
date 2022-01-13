import * as React from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView} from 'react-native'
import {Button, TextInput, ActivityIndicator} from 'react-native-paper'
import Header from './../components/header.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import {clear_user_data, delete_user_redux_api_call, update_user_redux_api_call} from './../redux/action'
import RNRestart from 'react-native-restart'
import Toast from 'react-native-toast-message';

class Settings extends React.Component{
    constructor(props){
        super(props)
    }

    state = {
        email:this.props.user.user_data.email,
        name: this.props.user.user_data.name,
        phone: this.props.user.user_data.mobile,
        token: this.props.user.token,
        loading: false,
        disableLogin:false,
        disableCLear:true,
        error: ""
    }

    loginDisableHandler = () => {
        if(this.state.email!=="" && this.state.name !== "" && this.state.phone !== ""){
            this.setState({disableLogin:false})
        }else{
            this.setState({disableLogin:true})
        }
    }

    componentDidUpdate = (prevProps , prevState)=>{
        if(prevState.email !== this.state.email || prevState.phone !== this.state.phone || prevState.name !== this.state.name){
            // this.clearDisableHandler()
            this.loginDisableHandler()
        }
    }

    validate = () => {
        const emailRegx = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        //const passwordRegx = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/
        const phoneRegx = /^[\d]{10}$/
        const nameRegx = /([a-zA-Z]+\s*)*/
        // && passwordRegx.exec(this.state.password.toString())
        if(!emailRegx.exec(this.state.email.toString().toLowerCase())){
            this.setState({error: "enter valid email!"})
        }else if(!phoneRegx.exec(this.state.phone)){
            this.setState({error: "enter valid phone number!"})
        }else{
            this.setState({error: ""})
            this.props.update_user_redux_api_call(this.state.token, {name: this.state.name, email: this.state.email, mobile: this.state.mobile})
        }
    }

    showToast = (msg) => {
        Toast.show({
          type: 'success',
          text1: msg,
        });
      }

    getHandler = key => value =>{
        this.setState({[key] : value})
    }

    update_user = async () =>{
        this.validate()
    }

    preference_press = () => {
        const {navigation} = this.props
        navigation.navigate('Preference')
    }

    request_press = () => {
        const {navigation} = this.props
        navigation.navigate('Request')
    }

    logout = () =>{
        this.props.clear_user_data({})
        RNRestart.Restart()
    }

    account_delete = () =>{
        this.props.delete_acc(this.props.user.token)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.user.token === undefined){
            RNRestart.Restart()
        }
        return null
    }

    render(){
        return(
            <View>
                <ScrollView>
                        <View style={styles.container}>
                            <TextInput label="Name" style={styles.input} theme={themes.name_theme} keyboardType="default" mode="outlined" value={this.state.name.trim()} onChangeText={this.getHandler('name')}/>
                            <TextInput label="Email" style={styles.input} theme={themes.email_theme} keyboardType="default" mode="outlined" value={this.state.email.trim()} onChangeText={this.getHandler('email')}/>
                            <TextInput label="Phone" style={styles.input} theme={themes.phone_theme} keyboardType="numeric" mode="outlined" value={this.state.phone.trim()} onChangeText={this.getHandler('phone')}/>
                        </View>

                        <View style={styles.button_container}>
                            <Button mode="contained" color={colors.login_button_color} style={styles.login_button} disabled={this.state.disableLogin} onPress={this.update_user}>Update</Button>
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
                            <TouchableOpacity onPress={this.preference_press}>
                                <Text style={{fontSize:17 , color:"#7d0633"}}>CHANGE PREFERENCES</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{alignItems:'center' , marginTop:15}}>
                            <TouchableOpacity onPress={this.request_press}>
                                <Text style={{fontSize:17 , color:"#7d0633"}}>REQUEST RECIPE</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{flexDirection:"row", justifyContent: "space-evenly", marginTop: 10}}>
                            <Button mode="contained" color={colors.login_button_color} style={styles.login_button} onPress={this.logout}>Logout</Button>
                            <Button mode="contained" color={colors.login_button_color} style={styles.login_button} onPress={this.account_delete}>Delete Account </Button>
                        </View>
                </ScrollView>
            </View>
        )
    }
}

const Func =  function(props) {
    const navigation = useNavigation();
    return <Settings {...props} navigation={navigation} />;
}

const msp = state => ({
    user: state.user 
})
export default connect(msp, {clear_user_data: clear_user_data, update_user_redux_api_call:update_user_redux_api_call, delete_acc: delete_user_redux_api_call})(Func)

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
    email_theme: { colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    password_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    name_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
    phone_theme:{ colors: { primary: '#1e5f74',underlineColor:'transparent',}},
}

const colors = {
    login_button_color:"#1e4f74",
    clear_button_color:"#1e4f74",
}