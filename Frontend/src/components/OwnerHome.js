import React,{Component} from 'react';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import {ownerProfileDetails} from '../queries/queries';
import {withApollo} from 'react-apollo';

class OwnerHome extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstName: "",
            orders: []
        }
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    handleSendMessage(message){
        this.setState(state => {
            const orders = state.orders.map(order => {
                // Find a menu with the matching id
                if(order.id == message.orderId){
                    //Return a new object
                    let orderToUpdate = {...order}
                    orderToUpdate.messages = orderToUpdate.messages.concat(message);
                    return orderToUpdate;
                }
                // Leave every other menu unchanged
                return order;
            });
            return {
                orders
            };
        });
    }

    //get the first name of owner from backend  
    componentDidMount(){
        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token');
            
            // Deleted fetch from here

        }
    }
    
    render(){
        const oldOrders = [];
        const newOrders =[];
        
        let redirectVar = null;
        let fname = this.props.location.fname;
        if(!fname){
            fname = localStorage.getItem('fname');
        }
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar firstName = {fname} />

            </div>
        )
    }
}

export default OwnerHome;