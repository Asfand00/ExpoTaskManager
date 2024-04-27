import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);

    const addTask = (title) => {
        const newTask = {
            id: Date.now(), // Unique ID using the timestamp
            title: title,
            completed: false
        };
        setTasks([...tasks, newTask]); // Append new task using spread syntax
    };

    const toggleTaskCompletion = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed }; // Toggle completion
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <View style={styles.container}>
            <Button title="Add Task" onPress={() => addTask("New Task")} />
            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Text style={[styles.task, item.completed && styles.completed]}>
                            {item.title}
                        </Text>
                        <Button title="Toggle" onPress={() => toggleTaskCompletion(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    task: {
        fontSize: 18,
    },
    completed: {
        textDecorationLine: 'line-through',
    }
});
