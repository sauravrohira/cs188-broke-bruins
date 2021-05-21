import './App.css'
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useAuth } from "./use-auth.js"

function CreateListing(props) {

    const auth = useAuth();
    const userId = auth.user.id;

    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [price, setPrice] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUploadError, setImageUploadError] = useState(null);

    const createPost = () => {
        console.log('creating post!')
        let rental = {}
        rental.userId = userId;
        rental.imageUrl = imageUrl;
        rental.price = price;
        rental.sold = false;
        rental.title = title;
        rental.sellerId = userId; 
        rental.description = description;
        console.log(JSON.stringify(rental))
        
        /* eslint eqeqeq: 0 */
        if(price == null || title == '' || description == ''){
            return
        }
        
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rental)
        }

        fetch("http://localhost:8000/api/rental/createListing", options)
        .then(res => { 
            if(res.ok) { 
                props.postCreated(); 
            }
        })
        .then(result => console.log('Listing created with id: ', result.Rental.id))
        .catch(err => console.log(err))

    }

    const handleImageUpload = () => {

        // Create an object of formData
        const formData = new FormData();
        
        // Update the formData object
        formData.append("image", imageFile);
        
        // Details of the uploaded file
        const options = {
            method: 'POST',
            body: formData
        };

        // replace cloudname with your Cloudinary cloud_name
        fetch('http://localhost:8000/api/image/upload', options)
            .then(res => {
                console.log(res)
                if (res.ok){
                    setImageUploadError(null);
                    res.json().then(body => setImageUrl(body.url))
                }
                else {
                    setImageUrl(null)
                    res.json().then(body => setImageUploadError(body.message))
                }
            })
            .catch(err => console.log(err));
    }

    return(
        <div className='Create-listing-popup'>
            <div className="Create-listing-heading"> Create a Listing </div>
            <form onSubmit={createPost}>
                <div className='Login-field'>
                    <TextField className='Login-field'
                        required
                        id="outlined-basic" 
                        label='Title' 
                        variant='outlined'
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}>
                    </TextField>
                </div>
                <div className='Login-field'>
                    <TextField 
                        required
                        id="outlined-basic" 
                        label='Price' 
                        variant='outlined'
                        value={price}
                        onChange={(e)=> setPrice(parseInt(e.target.value))}>
                    </TextField>
                </div>
                <div className='Login-field'>
                    <TextField 
                        required
                        id="outlined-basic" 
                        label='Description' 
                        variant='outlined'
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}>
                    </TextField>
                </div>
                <div className='Login-field'>
                    <div className="Create-listing-text">Upload an Image!</div>
                    <form>
                        <div>
                            <input type="file" style={{color: 'black'}} encty onChange={ e => setImageFile(e.target.files[0])}/>
                        </div>
                        <button type="button" onClick={handleImageUpload}>Upload</button>
                    </form>
                    {imageUrl && (<img src={imageUrl} alt ="uh" className="displayed-image" height="150" styles={{padding:'15'}}/> )}
                    {imageUploadError && (<div className="Create-listing-error-text"> {imageUploadError} </div>)}
                </div>
                <Button type="button" variant="contained" color="primary" onClick={createPost}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CreateListing
