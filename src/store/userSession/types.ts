import { LOGIN_STATUS } from './actionTypes';

interface LoginStatus {
	type: typeof LOGIN_STATUS;
	payload: any;
}

export type LoginActionTypes = LoginStatus;
