import './App.css'
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useAuth } from "./use-auth.js"

function CreateListing(props) {

    const auth = useAuth();
    const userId = auth.user.id;

    const [imageUrl, setImageUrl] = useState(null);
    const [price, setPrice] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [listingCreated, setListingCreated] = useState(false);

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
        const { files } = document.querySelector('input[type="file"]')
        const formData = new FormData();
        formData.append('file', files[0]);
        // replace this with your upload preset name
        formData.append('upload_preset', 'qy7jp6yj');
        const options = {
            method: 'POST',
            body: formData,
        };

        // replace cloudname with your Cloudinary cloud_name
        return fetch('https://api.Cloudinary.com/v1_1/dwb7bm6hn/image/upload', options)
            .then(res => res.json())
            .then(res => {
                setImageUrl(res.secure_url)
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
                            <input type="file" style={{color: 'black'}}/>
                        </div>
                        <button type="button" onClick={handleImageUpload}>Upload</button>
                    </form>
                    {imageUrl && (<img src={imageUrl} alt ="uh" className="displayed-image" height="150" styles={{padding:'15'}}/> )}
                </div>
                <Button type="button" variant="contained" color="primary" onClick={createPost}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CreateListing
