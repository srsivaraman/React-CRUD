import React, { useState, useEffect } from 'react'
import _ from 'lodash';

const EditUserForm = props => {

  let allUsers = localStorage.getItem('allEmployees') ? JSON.parse(localStorage.getItem('allEmployees')) : [];
 
  // Set the USER to edit 
  const [ user, setUser ] = useState(props.currentUser)
  useEffect(
	() => {
	  setUser(props.currentUser)
	},
	[ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
	const { name, value } = event.target
	setUser({ ...user, [name]: value })
  }

  return (

	<div className="formElement">
			<h3 align="center">Edit Employee</h3>
			<form  onSubmit={event => {
			  event.preventDefault()

			  props.updateUser(user.id, user)
			}}>
				<div className="form-group">
				  <label>Name</label>
				  <input type="text" className="form-control" required  name="name" value={user.name} onChange={handleInputChange} />
				</div>
				<div className="form-group">
				  <label>Email</label>
				  <input type="email" className="form-control"  required name="userEmail" value={user.userEmail} onChange={handleInputChange} />
				</div>
				<div className="form-group">
				  <label>Phone</label>
				  <input type="number" className="form-control"  size="10" name="userPhone" value={user.userPhone} onChange={handleInputChange} />
				</div>
				<div className="form-group">
				  <label>EmpId</label>
				  <input type="number" className="form-control"  name="userId" value={user.userId} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<input type="submit" 
					  value="Update" 
					  className="btn btn-primary"/>
				</div>
			</form>
		</div>
  )
}

export default EditUserForm
