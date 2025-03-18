import { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReservationScreen = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    const handleReservation = () => {
        Alert.alert(
            'Confirm Reservation',
            `Number of Campers: ${campers}\nHike-In: ${hikeIn ? 'Yes' : 'No'}\nDate: ${date.toLocaleDateString('en-US')}`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: resetForm
                },
                {
                    text: 'OK',
                    onPress: resetForm
                }
            ]
        );
    };

    return (
        <ScrollView>
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers:</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={campers}
                        onValueChange={(itemValue) => setCampers(itemValue)}
                    >
                        <Picker.Item label='1' value={1} />
                        <Picker.Item label='2' value={2} />
                        <Picker.Item label='3' value={3} />
                        <Picker.Item label='4' value={4} />
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='6' value={6} />
                    </Picker>
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike In?</Text>
                    <Switch
                        style={styles.formItem}
                        value={hikeIn}
                        trackColor={{ true: '#5637DD', false: '#d3d3d3' }}
                        thumbColor={hikeIn ? '#00FFFF' : '#FFFFFF'}
                        onValueChange={(value) => setHikeIn(value)}
                    />
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date:</Text>
                    <TouchableOpacity
                        onPress={() => setShowCalendar(!showCalendar)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{date.toLocaleDateString('en-US')}</Text>
                    </TouchableOpacity>
                </View>

                {showCalendar && (
                    <DateTimePicker
                        style={styles.formItem}
                        value={date}
                        mode='date'
                        display='default'
                        onChange={onDateChange}
                    />
                )}

                <View style={styles.formRow}>
                    <TouchableOpacity
                        onPress={handleReservation}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Search Availability</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
        color: 'black',
    },
    formItem: {
        flex: 1,
    },
    button: {
        backgroundColor: '#5637DD',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ReservationScreen;
