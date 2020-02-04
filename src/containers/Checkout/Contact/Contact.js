import React, {Component} from 'react'

import Button from '../../../components/UI/Button/Button';

import './Contact.css';

class Checkout extends Component{

    state = {
        name: '',
        email: '',
        message: ''
    }

    render(){
        return(
            <div className='contact'>
                <h4>Enter your contact data:</h4>
                <form>
                    <label>Name:</label>
                    <input type='text' name='name' placeholder='Name' />
                    <label>Email:</label>
                    <input type='email' name='email' placeholder='Email' />
                    <label>Message:</label>
                    <textarea type='text' name='message' placeholder='Your message' />
                    <Button type='success'>Send message</Button>
                </form>
            </div>
        );
    }
}

export default Checkout;