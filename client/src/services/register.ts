export const register = async (
    name: string,
    email: string,
    password: string
) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        name: name,
        email: email,
        password: password,
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            "http://localhost:8000/v1/api/users/register",
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