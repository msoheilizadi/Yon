import { StyleSheet, Text, View, Image } from "react-native";
import FadeImageSlider from "./SliderImages";
import SingleMusicPlayer from "./MusicPlayer";


function SliderMid() {
    return (
        <View style={styles.Container}>
            <View style={{flex: 1.6}}><FadeImageSlider imageStyle={styles.ImageStyle}/></View>
            <View style={styles.ViewContainer}>
                <Text style={styles.TextTopStyle}>آرامشی از جنس طبیعت</Text>
                <Text style={styles.TextBottomStyle}>کوهستان</Text>
                <SingleMusicPlayer />
            </View>
        </View>
    )
}

export default SliderMid;

const styles = StyleSheet.create({  
    Container: {
        backgroundColor: "#e2ded5",
        borderRadius: 36,
        flexDirection: "row",
        height: 175,
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 5,
        marginHorizontal: 6
    },
    ImageStyle: {
        borderRadius: 36,
        height: '100%',
        resizeMode: 'cover',
    },
    ViewContainer: {
        flex: 4,
        paddingHorizontal: 10
    },
    TextTopStyle: {
        fontSize: 16,
        fontFamily: 'YekanBakh-Regular',
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
        alignSelf: 'flex-start',
        paddingTop: 20,
        paddingBottom: 5,
        marginBottom: 5,
        fontWeight: '700'
    },
    TextBottomStyle: {
        fontSize: 14,
        fontFamily: 'YekanBakh-Thin',
    }
})