import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Result = ({ route, navigation }) => {
    const { correctAnswers, totalQuestions, questionHistory, quiz } = route.params;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    useEffect(() => {
        // Remove back button warning for results page
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const getStatusColor = (isCorrect) => {
        return isCorrect ? '#4CAF50' : '#f44336';
    };

    const getStatusText = (isCorrect) => {
        return isCorrect ? 'Correct' : 'Incorrect';
    };

    const handleTryAgain = () => {
        navigation.navigate('Quiz', { quiz });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{score}%</Text>
                    <Text style={styles.scoreLabel}>Your Score</Text>
                    <View style={styles.scoreDetails}>
                        <Text style={styles.scoreDetailText}>
                            {correctAnswers} correct out of {totalQuestions} questions
                        </Text>
                    </View>
                </View>

                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Quiz Summary</Text>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Correct Answers:</Text>
                        <Text style={styles.summaryValue}>{correctAnswers}</Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Total Questions:</Text>
                        <Text style={styles.summaryValue}>{totalQuestions}</Text>
                    </View>
                </View>

                <View style={styles.questionHistoryContainer}>
                    <Text style={styles.historyTitle}>Question History</Text>
                    {Array.from({ length: totalQuestions }, (_, index) => (
                        <View key={index} style={styles.historyItem}>
                            <Text style={styles.historyQuestion}>{index + 1}. {questionHistory[index]?.question || 'Question not answered'}</Text>
                            <View style={styles.historyRow}>
                                <View style={styles.historySelected}>
                                    <Icon 
                                        name={questionHistory[index]?.isCorrect ? 'check' : 'close'}
                                        size={20}
                                        color={getStatusColor(questionHistory[index]?.isCorrect)}
                                    />
                                    <Text style={[styles.historyText, { color: getStatusColor(questionHistory[index]?.isCorrect) }]}>
                                        Your Answer: {questionHistory[index]?.selected || 'Not answered'}
                                    </Text>
                                </View>
                                <View style={styles.historyCorrect}>
                                    <Icon 
                                        name="check"
                                        size={20}
                                        color={getStatusColor(true)}
                                    />
                                    <Text style={[styles.historyText, { color: getStatusColor(true) }]}>
                                        Correct Answer: {questionHistory[index]?.correct || 'Not available'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.retryButton, styles.retryButtonMargin]}
                    onPress={handleTryAgain}
                >
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.retryButton, styles.homeButton]}
                    onPress={() => navigation.navigate('QuizList')}
                >
                    <Text style={styles.retryButtonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        padding: 20,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    scoreLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    scoreDetails: {
        alignItems: 'center',
    },
    scoreDetailText: {
        fontSize: 14,
        color: '#666',
    },
    summaryContainer: {
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    questionHistoryContainer: {
        marginTop: 20,
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    historyItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    historyQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    historyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    historySelected: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    historyCorrect: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyText: {
        fontSize: 14,
        marginLeft: 5,
        flex: 1,
    },
    buttonContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    retryButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    retryButtonMargin: {
        marginRight: 10,
    },
    homeButton: {
        backgroundColor: '#4CAF50',
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Result;
