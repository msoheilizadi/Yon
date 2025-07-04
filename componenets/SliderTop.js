import react, { useState } from "react";
import { Text, View,Modal, Pressable ,Image, StyleSheet } from "react-native";
import SliderMid from "./SliderMid";
import FadeImageSlider from "./SliderImages";

function SliderTop() {

    const [modalVisibility, setModalVisibility] = useState(false)

    function pressMusics() {
        setModalVisibility(true)
    }

    function closeMusics() {
        setModalVisibility(false)
    }

    return (
        <>
            <View style={[{flex: 1}, styles.TopContainer]}>
                <FadeImageSlider />
            </View>
            <View style={styles.BottomContainer}>
                <SliderMid />
                <View style={styles.HorizantalLine} ></View>
                <View style={styles.IconBoxes}>
                    <Pressable style={styles.IconAndTextBox} >
                        <View style={styles.IconBox}>
                            <Image source={require('../assets/icons/icon4.png')}  style={styles.IconImages}/>
                        </View>
                        <Text style={styles.IconText}>مراقبه</Text>
                    </Pressable>
                     <Pressable style={styles.IconAndTextBox} onPress={pressMusics}>
                        <View style={styles.IconBox}>
                            <Image source={require('../assets/icons/icon5.png')}  style={styles.IconImages}/>
                        </View>
                        <Text style={styles.IconText}>موزیک</Text>
                    </Pressable >
                    <View style={styles.IconAndTextBox}>
                        <View style={styles.IconBox}>
                            <Image source={require('../assets/icons/icon6.png')}  style={styles.IconImages}/>
                        </View>
                        <Text style={styles.IconText}>محصولات</Text>
                    </View>
                    <View style={styles.IconAndTextBox}>
                        <View style={styles.IconBox}>
                            <Image source={require('../assets/icons/icon7.png')}  style={styles.IconImages}/>
                        </View>
                        <Text style={styles.IconText}>مهارت و دوره</Text>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Image source={require('../assets/icons/icon3.png')} style={styles.footerIcon}/>
                    <Image source={require('../assets/icons/icon2.png')} style={styles.footerIcon}/>
                    <Image source={require('../assets/icons/icin1.png')} style={styles.footerIcon}/>
                </View>
            </View>
            <Modal visible={modalVisibility} animationType="slide" transparent={true}>
                <View style={styles.musicsModal}>
                    <Pressable onPress={closeMusics}>
                        <Text style={styles.closeStyle}>برگشت به صفحه اصلی</Text>
                    </Pressable>
                    <View style={styles.musicContainer}>
                        <Text style={styles.numberStyle}>01</Text>
                        <Image source={require('../assets/icons/music.png')} />
                        <View style={{flexDirection: "column", marginLeft: "12"}}>
                            <Text style={styles.musicName}>THEYDREAM</Text>
                            <Text style={styles.musicBand}>TAMEIMPALA</Text>
                        </View>
                    </View>
                                        <View style={styles.musicContainer}>
                        <Text style={styles.numberStyle}>02</Text>
                        <Image source={require('../assets/icons/music.png')} />
                        <View style={{flexDirection: "column", marginLeft: "12"}}>
                            <Text style={styles.musicName}>THEYDREAM</Text>
                            <Text style={styles.musicBand}>TAMEIMPALA</Text>
                        </View>
                    </View>
                                        <View style={styles.musicContainer}>
                        <Text style={styles.numberStyle}>03</Text>
                        <Image source={require('../assets/icons/music.png')} />
                        <View style={{flexDirection: "column", marginLeft: "12"}}>
                            <Text style={styles.musicName}>THEYDREAM</Text>
                            <Text style={styles.musicBand}>TAMEIMPALA</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default SliderTop;

const styles = StyleSheet.create({
    TopContainer: {
        flex: 0.5,
        justifyContent: "center",
    },
    TextTop: {
        textAlign: "center",
        color: "white",
        fontSize: 30,
        marginTop: -80
    },
    BottomContainer: {
        flex: 0.5,
        backgroundColor: "#f9faf6",
        borderTopEndRadius: 36,
        borderTopLeftRadius: 36,
        marginTop: -80,
    },
    HorizantalLine: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 30,
        width: "90%",
        alignSelf: "center"
    },
    IconBoxes: {
        flexDirection: "row",
        alignSelf: "center",
    },
    IconAndTextBox: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    IconBox: {
        width: 60,
        height: 60,
        backgroundColor: "#e2ded5",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
        borderRadius: 10
    },
    IconImages: {
        height: 25,
        width: 25
    },
    IconText: {
        marginVertical: 6,
        fontSize: 12,
        fontFamily: 'YekanBakh-Thin',
        textAlign: "center"
    },
    footerContainer: {
        backgroundColor: "black",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center",
        width: 330,
        height: 42,
        borderRadius: 20,
        paddingHorizontal: 26,
        marginVertical: 15,
    },
    footerIcon: {
        width: 22,
        height: 22,
        resizeMode: "contain"
    },
    musicsModal: {
        borderTopEndRadius: 36,
        borderTopLeftRadius: 36,
        backgroundColor: "#f9faf6",
        marginTop: 40,
        flex: 1
    },
    musicContainer: {
        flexDirection:"row",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 20,
        alignItems: "center",
        paddingVertical: 20
    },
    closeStyle: {
        fontSize: 16,
        fontFamily: "YekanBakh-Regular",
        textAlign: "center",
        padding: 10,
    },
    musicName: {
        fontSize: 16,
        fontFamily: "YekanBakh-Regular",
        padding: 5,
    },
    musicBand: {
        fontSize: 12,
        fontFamily: "YekanBakh-Light",
        padding: 5,
    },
    numberStyle: {
        fontSize: 12,
        fontFamily: "YekanBakh-Light",
        padding: 5,
    }
})