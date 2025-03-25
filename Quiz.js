import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Quiz = ({ route, navigation }) => {
    const quiz = route.params?.quiz;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [questionState, setQuestionState] = useState({
        isAnswered: false,
        isCorrect: null,
        correctOption: null
    });
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questionHistory, setQuestionHistory] = useState(new Array(quiz?.questions.length).fill(null));

    useEffect(() => {
        // Disable back button for entire quiz
        const backAction = () => {
            Alert.alert(
                'Warning',
                'You cannot go back once you start the quiz!',
                [{ text: 'OK', style: 'cancel' }]
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const handleOptionSelect = (option) => {
        if (!questionState.isAnswered) {
            setSelectedOption(option);
        }
    };

    const handleSubmit = () => {
        if (!selectedOption) return;

        const question = quiz.questions[currentQuestionIndex];
        const isCorrect = selectedOption === question.correctAnswer;
        
        setQuestionState({
            isAnswered: true,
            isCorrect,
            correctOption: question.correctAnswer
        });

        // Update question history first
        const currentHistory = [...questionHistory];
        currentHistory[currentQuestionIndex] = {
            question: question.statement,
            selected: selectedOption,
            correct: question.correctAnswer,
            isCorrect
        };
        
        setQuestionHistory(currentHistory);

        // Calculate score based on history
        const correctCount = currentHistory.filter(item => item?.isCorrect).length;
        setCorrectAnswers(correctCount);

        // If it's the last question, navigate to results
        if (currentQuestionIndex === quiz.questions.length - 1) {
            console.log('Final score:', correctCount, 'out of', quiz.questions.length);
            navigation.navigate('Result', {
                correctAnswers: correctCount,
                totalQuestions: quiz.questions.length,
                questionHistory: currentHistory,
                quiz: quiz
            });
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setQuestionState({
                isAnswered: false,
                isCorrect: null,
                correctOption: null
            });
        }
    };

    if (!quiz) {
        return null;
    }

    const question = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>{currentQuestionIndex + 1}/{quiz.questions.length}</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
            </View>

            <Text style={styles.question}>{question.statement}</Text>
            
            {question.options.map((option, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => handleOptionSelect(option)}
                    disabled={questionState.isAnswered}
                    style={[
                        styles.optionButton,
                        selectedOption === option && !questionState.isAnswered && styles.selected,
                        questionState.isAnswered && {
                            backgroundColor: option === questionState.correctOption ? '#4CAF50' : '#f44336'
                        }
                    ]}
                >
                    <View style={styles.optionContent}>
                        {questionState.isAnswered && (
                            <Icon 
                                name={option === questionState.correctOption ? 'check' : 'close'}
                                size={24}
                                color={option === questionState.correctOption ? '#fff' : '#fff'}
                            />
                        )}
                        <Text style={[styles.optionText, questionState.isAnswered && { color: '#fff' }]}>
                            {option}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}

            <TouchableOpacity 
                onPress={questionState.isAnswered ? handleNext : handleSubmit} 
                style={[
                    styles.submitButton, 
                    questionState.isAnswered ? styles.nextButton : styles.submitButton,
                    !selectedOption && !questionState.isAnswered && styles.disabledButton
                ]}
                disabled={!selectedOption && !questionState.isAnswered}
            >
                <Text style={[
                    styles.submitButtonText,
                    !selectedOption && !questionState.isAnswered && styles.disabledButtonText
                ]}>
                    {questionState.isAnswered ? 'Next' : 'Check your answer'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    progressContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    progressText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    progressBar: {
        width: '100%',
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selected: {
        backgroundColor: '#e8f5e9',
        borderColor: '#4CAF50',
    },
    optionContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        elevation: 3,
    },
    nextButton: {
        backgroundColor: '#4CAF50',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        opacity: 0.6,
    },
    disabledButtonText: {
        color: '#666',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Quiz;
