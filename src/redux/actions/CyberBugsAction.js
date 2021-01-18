import axios from 'axios';
import { USER_SIGNIN_API } from '../constants/Cyberbugs/Cyberbugs';

export const siginCyberbugsAction = (email, password, history) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email:email,
            password: password,
            history: history
        }
    }
}
