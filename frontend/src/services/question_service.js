import axios from "axios";
import { URL_QUESTION } from "../configs";

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
)

export async function getQuestion(question_id, params) {
    try {
        const { data, status } = await client.get(`/${question_id}`,
          {params}
        )
        console.log (status )
        return data
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

export async function generateQuestionId(user_id, params) {
    try {
        const { data, status } = await client.get(`/id/${user_id}`,
           params
        )
        console.log (status )
        return data
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

export async function questionIndex() {
    try {
        const { data, status } = await client.get('/index')
        console.log (status )
        return data
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
