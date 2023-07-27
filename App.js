import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TodoApp = () => {
  const [tasks, setTasks] = useState([{ id: 1, name: 'Task 1', completed: false }]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), name: newTask.trim(), completed: false },
      ]);
      setNewTask('');
    }
  };

  const handleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleClearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>To Do List</Text>
          <Image source={require('./Ui.png')} style={styles.image} />
        </View>
      </View>
      <View style={styles.taskList}>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[styles.taskItem, { backgroundColor: '#a8a3a3' }]}
            onPress={() => handleTaskCompletion(task.id)}
          >
            <FontAwesome
              name={task.completed ? 'check-circle' : 'circle-thin'}
              size={20}
              color="Black"
            />
            <Text style={[styles.taskText, { textDecorationLine: task.completed ? 'line-through' : 'none' }]}>
              {task.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type Task Here"
          value={newTask}
          onChangeText={setNewTask}
          maxLength={50}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask} accessibilityLabel="Add Task">
          <FontAwesome name="plus" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={handleClearCompletedTasks}
          accessibilityLabel="Clear Completed Tasks"
        >
          <FontAwesome name="minus" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#331b7c',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 8,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 8,
  },
  taskText: {
    flex: 5,
    color: 'White',
    fontSize: 18,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#a8a3a3',
    backgroundColor: '#a8a3a3',
    borderRadius: 4,
    marginRight: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a8a3a3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a8a3a3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default TodoApp;
