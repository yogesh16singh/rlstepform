import React, { useState, useEffect } from 'react';

const GeolocationStatus: React.FC = () => {
    const [geolocationStatus, setGeolocationStatus] = useState<string>('Waiting for geolocation...');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    useEffect(() => {
        // Check if geolocation is supported in the browser
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setGeolocationStatus('Geolocation captured successfully!');
                },
                (error) => {
                    setGeolocationStatus(`Error: ${error.message}`);
                }
            );
        } else {
            setGeolocationStatus('Geolocation is not supported by your browser.');
        }
    }, []);

    return (
        <div className="bg-gray-200 p-4 rounded-md shadow-md dark:bg-black">
            <h2 className="text-lg font-semibold mb-2">Geolocation Status</h2>
            <p>{geolocationStatus}</p>
            {latitude && longitude && (
                <div className="mt-4">
                    <p><strong>Latitude:</strong> {latitude}</p>
                    <p><strong>Longitude:</strong> {longitude}</p>
                </div>
            )}
        </div>
    );
};

export default GeolocationStatus;
