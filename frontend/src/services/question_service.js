import axios from "axios";
import { URL_QUESTION } from "../configs";
import MOCK_QUESTION from "../mock/MockQuestion";

const client = axios.create(
    {
        baseURL: URL_QUESTION,
        headers:{
            Accept: 'application/json',
            post: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            put: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    }
);

export async function getQuestion(question_id, params) {
    if (question_id === 0) {
        return MOCK_QUESTION;
    }
    
    try {
        const { data, status } = await client.get(`/${question_id}`,
            {params}
        )
        console.log(status);
        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return MOCK_QUESTION;
        } else {
            console.log('unexpected error: ', error);
            return MOCK_QUESTION;
        }
    }
}

export async function generateQuestionId(user_id, params) {
    try {
        const { data, status } = await client.get(`/id/${user_id}`,
            params
        );
        console.log(status);
        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return 0;
        } else {
            console.log('unexpected error: ', error);
            return 0;
        }
    }
}

export async function questionIndex() {
    try {
        const { data, status } = await client.get('/index');
        console.log(status);
        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
