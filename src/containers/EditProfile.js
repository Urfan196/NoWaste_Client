import React, { Component } from 'react';
import Navbar from './Navbar'
import {connect} from 'react-redux'
import editProfile from '../actions/editProfile'
import deleteUser from '../actions/deleteUser'

class EditProfile extends Component {

    state = {
        firstName: this.props.currentUser.first_name,
        lastName: this.props.currentUser.last_name,
        email: this.props.currentUser.email,
        birthday: this.props.currentUser.birth_day
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    } 

    render() {
        const {firstName, lastName, birthday, email} = this.state
        const {editProfile, deleteUser, history, currentUser} = this.props
        return (
            <div>
                <div className = 'row'>
                    {<Navbar/>}
                </div>
                <div className = 'form-edit'>
                    <form className = 'container' onSubmit={(e)=> editProfile(e, history, this.state, currentUser.id)}>
                        <label htmlFor="firstName">First Name</label>
                        <input name="firstName" value={firstName} onChange={this.handleChange}/>
                        <label htmlFor="lastName">Last Name</label>
                        <input name="lastName" value={lastName} onChange={this.handleChange}/>
                        <label htmlFor="birthday">Birthday</label>
                        <input type='date' name="birthday" value={birthday} onChange={this.handleChange}/>
                        <label htmlFor="email">Email</label>
                        <input type='email' name="email" value={email} onChange={this.handleChange}/>
                        <button className="waves-effect waves btn blue" type="submit">
                            <i className="material-icons right">update</i>Update</button>
                    </form>
                    <br/><button className="waves-effect waves btn pink accent-3" type="submit" onClick={(e) => deleteUser(e, history, currentUser)}>
                        <i className="material-icons left">delete</i>Delete Your Account
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapsToDispatchProps = dispatch => {
    return {
        editProfile: (e, history, state, id) => dispatch(editProfile(e, history, state, id)),
        deleteUser: (e, history, user) => dispatch(deleteUser(e, history, user))
    }
}

export default connect(mapStateToProps, mapsToDispatchProps)(EditProfile);
