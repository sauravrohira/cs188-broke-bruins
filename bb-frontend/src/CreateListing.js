import './App.css'
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function CreateListing(props) {

     const [imageUrl, setImageUrl] = useState('');
     const [price, setPrice] = useState(0);
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [listingCreated, setListingCreated] = useState(false);

    const createPost = () => {
        console.log('creating post!')
        let post = {}
        post.sellerId = props.id;
        post.imageUrl = imageUrl;
        post.price = price;
        post.sold = false;
        post.title = title;
        post.description = description;
        console.log(post)
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
        <div>
            <h1> Create a Listing </h1>
            <form onSubmit={createPost} className='Login-Form'>
                <div>
                    <TextField 
                        id="outlined-basic" 
                        label='Title' 
                        variant='outlined'
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}>
                    </TextField>
                </div>
                <div>
                    <TextField 
                        id="outlined-basic" 
                        label='Price' 
                        variant='outlined'
                        value={price}
                        onChange={(e)=> setPrice(parseInt(e.target.value))}>
                    </TextField>
                </div>
                <div>
                    <TextField 
                        id="outlined-basic" 
                        label='Description' 
                        variant='outlined'
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}>
                    </TextField>
                </div>
                <div>
                    <p>Upload an Image!</p>
                    <form>
                        <div>
                            <input type="file"/>
                        </div>
                        <button type="button" onClick={handleImageUpload}>Upload</button>
                    </form>
                    {imageUrl && (<img src={imageUrl} className="displayed-image" height="150"/>)}
                </div>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CreateListing
