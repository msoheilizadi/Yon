import react , {useState} from "react";
import {View, ImageBackground,StyleSheet,Text, TextInput, Pressable, Alert} from "react-native";

function LoginPage() {
    const LoginImage = require('../assets/images/bimg.jpg');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState(''); 

    function hanldeLogin() {
        if (email === "admin" && password === "admin") {
            Alert.alert("ایمیل و پسوورد وارد شده درست میباشد");
        } else {
            Alert.alert("خطا! ایمیل یا پسوورد مربوطه اشتباه است");
        }
    }

    return (
        <ImageBackground style={styles.backGroundStyle} source={LoginImage}>
            <View style={styles.centerView}>
                <TextInput style={[styles.inputStyle , styles.textSize]} placeholder="آدرس ایمیل" placeholderTextColor={'white'} onChangeText={text => setEmail(text)}></TextInput>
                <TextInput style={[styles.inputStyle , styles.textSize]} placeholder="رمز کاربری" placeholderTextColor={'white'} onChangeText={text => setPassword(text)} secureTextEntry></TextInput>
                <Pressable style={styles.submitButton} onPress={() => {
                    hanldeLogin();
                }}>
                    <Text style={styles.textSize}>ورود</Text>
                </Pressable>
                <Pressable>
                    <Text style={[styles.textColor, {marginTop: "5"}]}>رمز عبور خود را فراموش کردید؟</Text>
                </Pressable>
                <Text style={styles.registerText}>برای ساخت اکانت روی <Text style={[styles.textColor, {fontWeight: '900', fontSize: "15"}]}>ثبت نام</Text> بزنید</Text>
            </View>
        </ImageBackground>
    )
}


export default LoginPage;

const styles = StyleSheet.create({
    textColor: {
        color: "white"
    },
    backGroundStyle: {
        flex: 1,
        alignItems: "center"
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        gap: 15
    },
    inputStyle: {
        borderBottomWidth: 1,
        borderColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: '100%',
        color: 'white',
        textAlign: "right",
        paddingBlock: 15
    },
    submitButton: {
        backgroundColor: "white",
        borderRadius: 30,
        width: "100%",
        alignItems:"center",
        padding: 10,
        marginTop: 25
    },
    textSize: {
        fontSize: 17
    },
    registerText: {
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        color: "white"
    }
})