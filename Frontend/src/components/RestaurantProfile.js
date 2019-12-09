import React,{Component} from 'react';
import {ownerProfileDetails} from '../queries/queries';
import {withApollo} from 'react-apollo';

//create the Owner Profile Component
class RestaurantProfile extends Component {
    constructor(props){
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);

        this.state = {
            message: "",
            isEditable:false,
            isNewImage: false,
            name: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            cuisine:"",
            imgURL: ""
        }
    }

    componentDidMount(){
        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token');
            
            // Deleted fetch from here

        }
    }
    
    //input change handler to update state variable with the text entered by the user
    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    editProfile = () => {
        this.setState({
            isEditable: true
        });
    }

    cancelEdit = () => {
        this.setState({
            isEditable: false
        });
    }

    handleFileUpload = (e) => {
        const fileField = document.querySelector('input[type="file"]');
        var output = document.getElementById('pic');
        output.src = URL.createObjectURL(fileField.files[0]);
        this.setState({
            isNewImage: true
        })
    }

    handleFileSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', document.querySelector('input[type="file"]').files[0]);
        formData.append('ownerId', localStorage.getItem('id'));
        
        const token = localStorage.getItem('token');
        
        // Deleted fetch from here

    }

    updateProfile = (e) => {
        e.preventDefault();
        const data = this.state;
        const token = localStorage.getItem('token');
        
        // Deleted fetch from here

    }

    render(){        
        let imageEdit = null;
        let profileEdit = null;
        let profileUpdate = null;
        
        if(this.state.isEditable){
            imageEdit = (
            <div>
                <form>
                    <div class="form-group user-image">
                        <input className = "upload-image" type="file" id="upload" onChange= {this.handleFileUpload}/>
                        <button className = "btn btn-primary btn-sm" 
                        disabled={!this.state.isNewImage} type="submit" onClick={this.handleFileSubmit}>Change Pic
                        </button>
                    </div>
                </form>
            </div>
            );
            
            profileUpdate = (
                <div className = "btn-toolbar">
                    <button type = "submit" className="btn btn-success">Update</button>
                    <button onClick = {this.cancelEdit} className="btn btn-danger">Cancel</button>
                </div>    
            );
        }else{
            profileEdit = (
                <div>
                    <button onClick = {this.editProfile} className="btn btn-primary">Edit</button>
                </div>
            );
        }
        
        return(
            <div>
                
                <div className="container">
                    <form onSubmit = {this.updateProfile}>
                    <div className="profile-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2 style= {{color:"red"}}>{this.state.message}</h2>
                                <h2>Restaurant Profile</h2>
                                <p>View or Update Profile</p>
                            </div>
                            <div class = "profile-image">
                                <label>Image</label>
                                <img className="rounded float-left img-thumbnail" id="pic" 
                                src={this.state.imgURL} alt="Responsive image"></img>
                            </div>
                            {imageEdit}
                            <div className="form-group form-inline">
                                <label >Name</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="name" placeholder="Name"
                                value = {this.state.name}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Phone</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="phone" placeholder="Phone"
                                value = {this.state.phone}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Street</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="street" placeholder="Street"
                                value = {this.state.street}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >City</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="city" placeholder="City"
                                value = {this.state.city}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >State</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="state" placeholder="State"
                                value = {this.state.state}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Zip</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="number" min="1" step="1" className="form-control" name="zip" placeholder="Zip"
                                value = {this.state.zip}/>
                            </div>
                            <div className="form-group form-inline">
                                <label >Cuisine</label>
                                <input required disabled={!this.state.isEditable} onChange = {this.handleChange} 
                                type="text" className="form-control" name="cuisine" placeholder="Cuisine"
                                value = {this.state.cuisine}/>
                            </div>
                                {profileUpdate}   
                                {profileEdit}          
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            
        
        )
    }
}

export default RestaurantProfile;