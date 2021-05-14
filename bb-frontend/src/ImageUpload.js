import React, { Component } from 'react';
import axios from 'axios';

class ImageUpload extends Component {
    state = {
        imageUrl: null,
        imageAlt: null,
    }

    handleImageUpload = () => {
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
                this.setState({
                    imageUrl: res.secure_url,
                    imageAlt: `An image of ${res.original_filename}`
                })
        })
            .catch(err => console.log(err));
    }
    
    render() {
        const {imageUrl, imageAlt} = this.state
        return (
        <div>
            <section className="left-side">
                <form>
                    <div className="form-group">
                        <input type="file"/>
                    </div>
                    <button type="button" className="btn" onClick={this.handleImageUpload}>Submit</button>
                </form>
            </section>
            <section className="right-side">
                <p>The resulting image will be displayed here</p>
                 {imageUrl && (<img src={imageUrl} alt={imageAlt} className="displayed-image"/>)}
            </section>
      </div>
        )
    }
}

export default ImageUpload