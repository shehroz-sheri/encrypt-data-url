import React, { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js';
import { message } from 'antd';


export default function Encryption() {
    const [decryptedFileContent, setDecryptedFileContent] = useState('');
    const [decryptedTextInput, setDecryptedTextInput] = useState('');

    useEffect(() => {
        const getQueryParam = (param) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        };

        const decryptData = (encryptedData) => {
            const key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
            const iv = CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');

            const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv });
            return decrypted.toString(CryptoJS.enc.Utf8);
        };

        const encryptedFileData = getQueryParam('file');
        const encryptedTextData = getQueryParam('text');

        if (encryptedFileData) {
            const decodedFileData = decodeURIComponent(encryptedFileData);
            const fileData = decryptData(decodedFileData);
            setDecryptedFileContent(fileData);
        }

        if (encryptedTextData) {
            const decodedTextData = decodeURIComponent(encryptedTextData);
            const textData = decryptData(decodedTextData);
            setDecryptedTextInput(textData);
        }
    }, []);

    const clipboardCopy = () => {
        { navigator.clipboard.writeText(document.getElementById('decryptedText').innerText) }
        message.success('Copied')
    }

    return (
        <div className='container my-4'>
            <h1 className='fs-3 mt-3 mb-5 text-center'>Decrypted Data from URL</h1>

            {decryptedFileContent
                ? <div className='my-4'>
                    <div className="d-flex justify-content-between">
                        <h5 className='my-2'>Decrypted File Content: </h5>
                        <svg className='me-2 mt-2' style={{ cursor: 'pointer' }} onClick={() => clipboardCopy()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                        </svg>
                    </div>
                    <pre className='p-2 border rounded' id='decryptedText'>{decryptedFileContent}</pre>
                </div>
                : ''
            }

            {
                decryptedTextInput
                    ? <div className='my-4'>
                        <div className="d-flex justify-content-between">
                            <h5 className='my-2'>Decrypted Text: </h5>
                            <svg className='me-2 mt-2' style={{ cursor: 'pointer' }} onClick={() => clipboardCopy()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                            </svg>
                        </div>
                        <pre className='p-2 border rounded' id='decryptedText'>{decryptedTextInput}</pre>
                    </div>
                    : ''
            }
        </div>
    )
}
