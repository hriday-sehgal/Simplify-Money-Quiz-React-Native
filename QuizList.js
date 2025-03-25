import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuizList = ({ route, navigation }) => {
    const quizzes = route.params?.quizzes || [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quiz List</Text>
            {quizzes.map((quiz, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.quizItem}
                    onPress={() => navigation.navigate('Quiz', { quiz })}
                >
                    <Text style={styles.quizTitle}>{quiz.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    quizItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    quizTitle: {
        fontSize: 18,
        color: '#333',
    },
});

export default QuizList;
