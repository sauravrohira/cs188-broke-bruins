import React, { Component } from 'react';

class ImageUpload extends Component {
    state = {
        imageUrl: null,
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
                })
        })
            .catch(err => console.log(err));
    }
    
    render() {
        const {imageUrl} = this.state
        return (
        <div>
            <section>
                <form>
                    <div>
                        <input type="file"/>
                    </div>
                    <button type="button" onClick={this.handleImageUpload}>Submit</button>
                </form>
            </section>
            <section>
                 {imageUrl && (<img src={imageUrl} className="displayed-image" height="150"/>)}
            </section>
      </div>
        )
    }
}

export default ImageUpload