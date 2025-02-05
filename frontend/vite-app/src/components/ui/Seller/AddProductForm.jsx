import React, { useState } from 'react';
import { TextField, Button, LinearProgress, Typography } from '@mui/material';
import { pinata } from "../../../utils/config"
import { Link } from 'react-router';

export default function AddProductForm() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    // const [file, setFile] = useState();
    const [uploadStatus, setUploadStatus] = useState('');
    const [url, setUrl] = useState("");
    
    const handleFileChange = async (e) => {
        // setFile(e.target?.files?.[0]);
        setUploadStatus('uploading');

        // File upload
        setTimeout(async () => {
            try {
                const upload = await pinata.upload.file(e.target?.files?.[0])
                console.log(upload);
        
                const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash)
                console.log(ipfsUrl);
                
                setUrl(ipfsUrl)
                setUploadStatus('uploaded')
            } catch (error) {
                setUploadStatus("failed")
                console.log(error);
            }
        }, 2000);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            productName,
            description,
            price,
            url
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <Typography variant="h6" style={{ margin: '20px 0 10px' }}>
                Select Product Image
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label htmlFor="file-input" style={{ marginRight: '10px' }}>
                    <Typography variant="body1">Upload Image:</Typography>
                </label>
                <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    required
                    style={{ flex: 1 }}
                />
            </div><br />
            {uploadStatus === 'uploading' && <LinearProgress />}
            {uploadStatus === 'uploaded' && <Typography>Uploaded</Typography>}
            {uploadStatus === 'uploaded' && <Link to={url} target='_blank' >{url}</Link>}
            <br />
            {uploadStatus === 'failed' && <Typography color="error">Upload Failed. Try Again or select a different image</Typography>}
            <br />
            {uploadStatus === 'uploaded' && (
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            )}
        </form>
    );
}
        