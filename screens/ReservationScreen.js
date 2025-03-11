import { useState } from 'react';
import { 
    Text, 
    View, 
    ScrollView, 
    StyleSheet, 
    Switch, 
    TouchableOpacity, 
    Platform, 
    Modal 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReservationScreen = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleReservation = () => {
        console.log('campers:', campers);
        console.log('hikeIn:', hikeIn);
        console.log('date:', date);
        setShowModal(true);
    };

    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    return (
        <ScrollView>
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

            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Search Campsite Reservations</Text>
                    <Text style={styles.modalText}>Number of Campers: {campers}</Text>
                    <Text style={styles.modalText}>Hike-In?: {hikeIn ? 'Yes' : 'No'}</Text>
                    <Text style={styles.modalText}>Date: {date.toLocaleDateString('en-US')}</Text>

                    <TouchableOpacity 
                        onPress={() => {
                            setShowModal(false);
                            resetForm();
                        }} 
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default ReservationScreen;
