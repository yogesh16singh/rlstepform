export const loginapi = async (email: string, password: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        email: email,
        password: password,
    });

    var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    try {
        const response = await fetch(
            `https://stepform-vlot.onrender.com/v1/api/users/login`,
            requestOptions
        );

        const data = await response.json();
        // Check if the response is successful (status code 2xx)
        if (response.ok) {
            // Parse the JSON response
            return data;
        } else {
            // Handle non-successful responses (status code other than 2xx)
            return data;
        }
    } catch (error: any) {
        return error;
        // Handle fetch errors (network issues, etc.)
        // throw new Error(`Failed to register: ${error.message}`);
    }
};