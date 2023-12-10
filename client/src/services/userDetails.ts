export const basicDetails = async (
    name: string,
    email: string,
    phoneNumber: string,
    line1: string,
    line2: string,
    state: string,
    city: string,
    pincode: string,
    country: string,
    files: string,
    options: string,
    userId: string
) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        line1: line1,
        line2: line2,
        city: city,
        pincode: pincode,
        country: country,
        files: files,
        options: options,
        userId: userId,
        state: state,
    });

    // console.log(name, email, phoneNumber, line1);

    var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `https://stepform-vlot.onrender.com/v1/api/userdetails/user-details`,
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

export const getAllDetails = async (id: string | null) => {
    // var raw = "";

    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `https://stepform-vlot.onrender.com/v1/api/userdetails/user-details/${id}`,
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


export const getAllDetailsByEmail = async (email: string | null) => {
    // var raw = "";

    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `https://stepform-vlot.onrender.com/v1/api/userdetails/user-details/email/${email}`,
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