import React,{Component} from 'react';
import {sectionCreationMutation} from '../../queries/queries';
import {withApollo} from 'react-apollo';

class Section extends Component {
     constructor(props){
        super(props);

        this.state = {
            isEditable: false
        }
        //Bind the handlers to this class
        this.handleEditChange = this.handleEditChange.bind(this);
        this.editSection = this.editSection.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.updateSection = this.updateSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
    }

    handleEditChange = e => {
        this.props.onEditChange(this.props.section._id, e.target);
    }

    editSection = () => {
        this.setState({
            isEditable: true
        });
    }

    cancelEdit = () => {
        this.setState({
            isEditable: false
        });
    }

    //submit Login handler to send a request to the node backend
    updateSection = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            ownerId:localStorage.getItem('id'),
            id : this.props.section._id,
            name : this.props.section.name
        }

        const token = localStorage.getItem('token');
        
        // Deleted fetch from here

    }

    deleteSection = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            ownerId:localStorage.getItem('id'),
            id : this.props.section._id
        }
        
        // Deleted fetch from here
    }

    render(){
        let sectionEdit = null;
        let sectionUpdate = null;
        let editCancel = null; 

        if(this.state.isEditable){
            sectionUpdate = (
                <button onClick = {this.updateSection} className="btn btn-success">Update</button>
            );
            editCancel = (
                <button onClick = {this.cancelEdit} className="btn btn-danger">Cancel</button>
            );
        }else{
            sectionEdit = (
                <button onClick = {this.editSection} className="btn btn-primary">Edit</button>
            );
        }

        return(
            <div>
                <hr/>
                <h2 style= {{color:"red"}}>{this.state.message}</h2>
                <div className = "section-bar">
                    <input  onChange = {this.handleEditChange} 
                    value = {this.props.section.name} disabled={!this.state.isEditable}
                    type="text" className="form-control" name="name" placeholder="Name"/>
                    {sectionEdit}
                    {sectionUpdate}
                    {editCancel}
                    <button onClick = {this.deleteSection} disabled={this.state.isEditable}
                    className="btn btn-primary">Delete</button>
                </div>
            </div>
        )
    }
}

export default Section;