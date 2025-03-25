import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizList from './QuizList';
import Quiz from './Quiz';
import Result from './Result';

const Stack = createStackNavigator();

const App = () => {
    const quizzes = [
        {
            title: 'Financial Literacy Quiz',
            questions: [
                {
                    statement: 'What is the main purpose of a budget?',
                    options: ['To plan and track your spending', 'To save money', 'To invest in stocks', 'To pay off debt'],
                    correctAnswer: 'To plan and track your spending'
                },
                {
                    statement: 'What is compound interest?',
                    options: ['Interest earned on both the principal and previously earned interest', 'Interest earned only on the principal amount', 'A type of investment', 'A tax on savings'],
                    correctAnswer: 'Interest earned on both the principal and previously earned interest'
                },
                {
                    statement: 'What is the recommended percentage of income to save each month?',
                    options: ['10%', '20%', '30%', '40%'],
                    correctAnswer: '20%'
                },
                {
                    statement: 'What is diversification?',
                    options: ['Investing all money in one stock', 'Putting money in a savings account', 'Spreading investments across different assets', 'Borrowing money to invest'],
                    correctAnswer: 'Spreading investments across different assets'
                },
                {
                    statement: 'What is the main benefit of an emergency fund?',
                    options: ['To invest in stocks', 'To cover unexpected expenses', 'To pay off debt', 'To buy luxury items'],
                    correctAnswer: 'To cover unexpected expenses'
                }
            ]
        },
        {
            title: 'Investment Basics Quiz',
            questions: [
                {
                    statement: 'What is a stock market index?',
                    options: ['A single company stock', 'A collection of stocks representing a segment of the market', 'A bank account', 'A type of bond'],
                    correctAnswer: 'A collection of stocks representing a segment of the market'
                },
                {
                    statement: 'What is a mutual fund?',
                    options: ['A single company stock', 'A pool of investments managed by professionals', 'A type of bond', 'A savings account'],
                    correctAnswer: 'A pool of investments managed by professionals'
                },
                {
                    statement: 'What is risk tolerance?',
                    options: ['The amount of risk you are comfortable taking with your investments', 'The amount of money you have to invest', 'The type of investment you choose', 'The return on investment you expect'],
                    correctAnswer: 'The amount of risk you are comfortable taking with your investments'
                },
                {
                    statement: 'What is a dividend?',
                    options: ['A loan from a bank', 'A payment from a company to its shareholders', 'A type of bond', 'A tax on investments'],
                    correctAnswer: 'A payment from a company to its shareholders'
                },
                {
                    statement: 'What is asset allocation?',
                    options: ['Putting all money in one investment', 'Spreading investments across different asset classes', 'Borrowing money to invest', 'Putting money in a savings account'],
                    correctAnswer: 'Spreading investments across different asset classes'
                }
            ]
        }
    ];

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="QuizList">
                <Stack.Screen 
                    name="QuizList" 
                    component={QuizList} 
                    options={{ title: 'Quiz List' }}
                    initialParams={{ quizzes }}
                />
                <Stack.Screen 
                    name="Quiz" 
                    component={Quiz} 
                    options={({ route }) => ({ title: route.params?.quiz?.title || 'Quiz' })}
                />
                <Stack.Screen 
                    name="Result" 
                    component={Result} 
                    options={{ title: 'Results' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
