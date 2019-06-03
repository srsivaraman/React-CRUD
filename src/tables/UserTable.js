import React , { useState } from 'react'
import { Link } from 'react-router-dom';
import EditUserForm from '../forms/EditUserForm'
import _ from 'lodash';
import { toast } from 'react-toastify';

const UserTable = props => {

  const usersData = [
    { id: 1, name: 'Test admin', userEmail: 'admin@mail.com', userPhone: '7890654312', userId: '1001'  },
    { id: 2, name: 'Clarke', userEmail: 'clark@mail.com', userPhone: '7890654313', userId: '1002' },
    { id: 3, name: 'Bala', userEmail: 'bala@gmail.com', userPhone: '7890654314', userId: '1003' },
  ];

  let availableUsers = localStorage.getItem('allEmployees') ?  JSON.parse(localStorage.getItem('allEmployees')) : usersData ;
  localStorage.setItem('allEmployees', JSON.stringify(availableUsers)); 

  const deleteRow  =  (id) => {

    const allUsers = localStorage.getItem('allEmployees') ? JSON.parse(localStorage.getItem('allEmployees')) : availableUsers; 
    availableUsers  = _.filter( allUsers, function(o) { return o.id != id }) ;  
    localStorage.setItem('allEmployees', JSON.stringify(availableUsers) );
    props.history.push('/');
    toast.success("Employee Deleted Successfully !", {
        position: toast.POSITION.TOP_RIGHT
    });
  }

  // To assign initial value to current user
  const initialFormState = { id: null, name: '', userEmail: '', userPhone:'', userId:'' }
  const [ currentUser, setCurrentUser ] = useState(initialFormState)
  const [ editing, setEditing ] = useState(false)


  // To enable Edit view and set User to Edit
  const editRow = user => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, userEmail: user.userEmail , 
      userPhone: user.userPhone, userId: user.userId})
  }

  // Update User function called from EditUser form Component
  const updateUser = (id, updatedUser) => {
    setEditing(false);

    if (!updatedUser.name || !updatedUser.userEmail) return;

    const allUsers = localStorage.getItem('allEmployees') ? JSON.parse(localStorage.getItem('allEmployees')) : []; 
    const usersToUpdate  = _.filter( allUsers, function(o) { return o.id != id }) ;  
    usersToUpdate.push(updatedUser);
    localStorage.setItem('allEmployees', JSON.stringify(usersToUpdate) );
    props.history.push('/');
    toast.success("Employee Updated Successfully !", {
        position: toast.POSITION.TOP_RIGHT
    });
  }

   return (
        <div>

          {editing ? (
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            ) : (
              <div>
                <h3 align="center">Employees List</h3>
                  <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>EmpId</th>
                        <th colSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {availableUsers.length > 0 ? 
                        (availableUsers.map(user => (
                  <tr key={user.id}>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.userEmail}
                  </td>
                  <td>
                    {user.userPhone}
                  </td>
                  <td>
                    {user.userId}
                  </td>
                  <td>
                    <button onClick={ () => {editRow(user)} } className="btn btn-primary"><span className="glyphicon glyphicon-edit"></span>Edit</button>
                  </td>
                  <td>
                    <button onClick={ () => {deleteRow(user.id)} } className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span> Delete</button>
                  </td>
                </tr>) )): (
                          <tr>
                            <td colSpan={6}  align="center">No Employees Found</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
              </div>
            )}
          
        </div>
      );

}



export default UserTable
