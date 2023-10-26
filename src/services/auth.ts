interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export const login = async (email: string, password: string) => {
  try {
    const requestBody = {
      email: email,
      password: password,
    };

    // const response = await fetch('http://localhost:3000/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    // if (response.ok) {
    //   const data = await response.json();
    //   return data;
    // } else {
    //   throw new Error(`Request failed with status ${response.status}`);
    // }

    if (email == "admin" && password == "admin") {
      const data = {
        token: "jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3",
        user: {
          name: "Admin User",
          email: "admin",
          isAdmin: true,
        },
      };
      return data;
    } else {
      const data = {
        token: "jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3",
        user: {
          name: "Normal User",
          email: "user@example.com",
          isAdmin: false,
        },
      };

      return data;
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};
