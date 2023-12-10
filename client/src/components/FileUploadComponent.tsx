import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import GeolocationStatus from './GeolocationStatus';

const validFileTypes = ['image/png', 'application/pdf'];
const maxFileLimit = 3;

type MyFunctionType = (num: number) => void;

interface basicDetailsProps {
    setForm: MyFunctionType,
    setAllFormData: MyFunctionType,
    allFormData: any,
}

type Accept = string | undefined;

const FileUploadComponent: React.FC<basicDetailsProps> = ({ setAllFormData, allFormData, setForm }) => {
    const Navigate = useNavigate();
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    console.log('files', files)
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const filteredFiles = acceptedFiles.filter(file => validFileTypes.includes(file.type));
            const remainingSlots = maxFileLimit - files.length;

            if (filteredFiles.length > remainingSlots) {
                setError(`You can upload up to ${maxFileLimit} files.`);
            } else if (filteredFiles.length !== acceptedFiles.length) {
                setError('Invalid file type. Please upload PNG or PDF files only.');
            } else {
                setError('');
                setFiles(prevFiles => [...prevFiles, ...filteredFiles]);
            }
        },
        [files]
    );


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: validFileTypes.join(','),
        multiple: true,
        maxFiles: maxFileLimit - files.length,
    });

    const filePreviews = useMemo(
        () =>
            files.map((file, index) => (
                <li key={index} className="mb-2">
                    {file.name}
                </li>
            )),
        [files]
    );

    const nextFunct = () => {
        let newData = []
        for (let i = 0; i <= files.length - 1; i++) {
            newData.push({ name: files[i]?.name, path: files[i]?.path })
        };
        // console.log('newData', newData)
        setAllFormData({ ...allFormData, files: newData })
        setForm(2);
    };

    return (
        <>
            <GeolocationStatus />
            <p className="text-2xl font-bold mb-4">Upload Files</p>
            <div className="p-4 border border-gray-300 rounded-lg cursor-pointer">
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p className="text-gray-600 text-center dark:text-white">
                        Drag & drop PNG or PDF files here, or click to select files (up to {maxFileLimit} files allowed).
                    </p>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                {files.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Selected Files:</h2>
                        <ul>{filePreviews}</ul>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-around mt-10">
                <button onClick={() => Navigate('/')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Cancel
                </button>

                <button onClick={() => setForm(0)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Previous
                </button>

                <button onClick={nextFunct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Next
                </button>
            </div>
        </>
    );
};

export default FileUploadComponent;
