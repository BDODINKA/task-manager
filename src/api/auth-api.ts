import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1bd56c2f-a2f7-4e34-acfb-2f323d8e9df5'
    }
})

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const AuthAPI = {
    auth(data: LoginParamsType) {
        return instance.post<LoginParamsType,AxiosResponse<ResponseType<{userId:number}>>>('/auth/login', data);
    }
}
