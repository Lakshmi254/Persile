import { SystemState } from '../storeType';

export const getUserLoginStatusState = (state: SystemState) =>
	state.userSession.loginStatus;
