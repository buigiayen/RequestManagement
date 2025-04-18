namespace AUTHENTICATION {
  export interface LOGIN_REQUEST {
    userName: string;
    password: string;
  }
  export interface LOGIN_RESPONSE {
    token: string;
    expiration: string;
    user: {
      id: number;
      userName: string;
      email: string;
      firstName: string;
      lastName: string;
      roles: string[];
    };
  }

  export interface REGISTER_REQUEST {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
  } 
}
