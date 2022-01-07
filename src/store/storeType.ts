export interface SystemState {
  userSession: {
    loginStatus: {
      isLoading: boolean;
      userToken: any;
      onboardingStatus: boolean;
      userType: string;
    };
  };
}
