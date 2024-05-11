import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {

  const [students, setStudents] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [favoriteSubject, setFavoriteSubject] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addStudent = () => {
    setStudents(prevStudents => [
      ...prevStudents,
      {
        id: Math.random().toString(),
        name: name,
        studentId: studentId,
        favoriteSubject: favoriteSubject,
        birthDate: birthDate.toDateString()
      }
    ]);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
    setShowDatePicker(false); // Ocultar el DatePicker después de seleccionar la fecha
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Estudiante" onPress={toggleModal} />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Estudiante</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Carnet"
            onChangeText={setStudentId}
            value={studentId}
          />
          <TextInput
            style={styles.input}
            placeholder="Materia Favorita"
            onChangeText={setFavoriteSubject}
            value={favoriteSubject}
          />
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>Seleccionar Fecha de Nacimiento</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
          <Button title="Agregar" onPress={addStudent} />
          <Button title="Cancelar" onPress={toggleModal} />
        </View>
      </Modal>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text>{item.name}</Text>
            <Text>{item.studentId}</Text>
            <Text>{item.favoriteSubject}</Text>
            <Text>{item.birthDate}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  datePickerButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  datePickerText: {
    color: 'white',
  },
  studentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
