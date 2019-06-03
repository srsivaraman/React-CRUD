import React, { useState } from 'react';
import { toast } from 'react-toastify';

import _ from 'lodash';

const AddUserForm = props => {
	const initialFormState = { id: null, name: '', userEmail: '', userPhone:'', userId:'' }
	const [ user, setUser ] = useState(initialFormState);
	var allEmployees = [];

	const handleInputChange = event => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value })
	}

	const handleSubmit = event => {

		event.preventDefault();
		if (!user.name || !user.userEmail) return

		allEmployees = localStorage.getItem('allEmployees') ? JSON.parse(localStorage.getItem('allEmployees')) : [];
		user.id = (allEmployees && allEmployees.length) ? (_.maxBy( allEmployees, 'id').id + 1) : 1; 

		allEmployees.push(user);
		localStorage.setItem('allEmployees', JSON.stringify(allEmployees) );
		setUser(initialFormState);
        toast.success("Employee Created Successfully !", {
            position: toast.POSITION.TOP_RIGHT
        });
		props.history.push('/');
	}

	return (
        <div className="formElement">
            <h3 align="center">Add New Employee</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
				    <input type="text" className="form-control"  required name="name" value={user.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
					<input type="email" className="form-control"  required name="userEmail" value={user.userEmail} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
					<input type="number" className="form-control" size="10" name="userPhone" value={user.userPhone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>EmpId</label>
					<input type="number" className="form-control"  name="userId" value={user.userId} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Register" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default AddUserForm
