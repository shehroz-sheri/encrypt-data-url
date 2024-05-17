import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';
import { message } from 'antd';


export default function Encryption() {
    const [fileContent, setFileContent] = useState('');
    const [textInput, setTextInput] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('')

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFileContent(reader.result);
        };

        reader.readAsText(file);
    };

    const handleTextInput = (event) => {
        setTextInput(event.target.value);
    };

    const generateURL = () => {
        if (!fileContent && !textInput) return;

        const key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
        const iv = CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');

        const fileEncrypted = fileContent ? CryptoJS.AES.encrypt(fileContent, key, { iv: iv }).toString() : '';
        const textEncrypted = textInput ? CryptoJS.AES.encrypt(textInput, key, { iv: iv }).toString() : '';

        const encodedFileData = encodeURIComponent(fileEncrypted);
        const encodedTextData = encodeURIComponent(textEncrypted);

        const baseURL = window.location.href.split('?')[0];
        const url = `${baseURL}decrypt-data?file=${encodedFileData}&text=${encodedTextData}`;

        setGeneratedUrl(url);
    };

    const copyToClipboard = () => {
        { navigator.clipboard.writeText(document.getElementById('encryptedLink').innerText) }
        message.success('Link Copied')
    }

    return (
        <div className='container my-4'>
            <div className=''>
                <h1 className='fs-3 mb-4 text-center'>Encrypt and Generate URL</h1>
                <label htmlFor="text-file" className='py-2'>Only text File (.txt) :</label>
                <input type="file" onChange={handleFileUpload} accept='.txt' name="text-file" id="text-file" className='form-control' />

                <p className='fw-semibold fs-4 mt-3 text-center'>OR</p>
                <label htmlFor='text text-center'>Write the text you want to encrypt:</label>
                <textarea value={textInput} onChange={handleTextInput} className='form-control' name="text" id="text" placeholder='Type or paste tet here you want to encrypt' />
                <br />
                <div className="text-center">
                    <button onClick={generateURL} disabled={!fileContent && !textInput} className="btn btn-primary">Generate URL</button>
                </div>
            </div>

            {generatedUrl && (
                <div>
                    <div className='text-start my-2'>
                        <div className="d-flex justify-content-between">
                            <h2 className='fs-5'>Encrypted URL :</h2>
                            <svg onClick={copyToClipboard} className='' style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                            </svg>
                        </div>
                        <p className='d-flex justify-content-center'>
                            <Link id='encryptedLink' style={{ overflow: 'auto' }} target='blank' to={generatedUrl}>{generatedUrl}</Link>
                        </p>
                    </div>
                </div>

            )}

        </div>
    )
}
