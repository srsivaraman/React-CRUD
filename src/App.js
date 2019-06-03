import React, { useState, Fragment } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Call it once in your app. At the root of your app is the best place
toast.configure({
  autoClose: 3000,
  draggable: false
  //etc you get the idea
})


const App = () => {
	// Data

	// const initialFormState = { id: null, name: '', userEmail: '',  userPhone: '',  userId: '' }
	// // Setting state
	// const [ currentUser, setCurrentUser ] = useState(initialFormState)
	// const [ editing, setEditing ] = useState(false)

	// // CRUD operations
	// // const addUser = user => {
	// // 	user.id = users.length + 1
	// // 	setUsers([ ...users, user ])
	// // }

	// const editRow = user => {
	// 	setEditing(true)

	// 	setCurrentUser({ id: user.id, name: user.name, userEmail: user.userEmail , 
	// 		userPhone: user.userPhone, userId: user.userId})
	// }

    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Employees App</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
              <Route exact path='/create' component={ AddUserForm } />
              <Route path='/' component={ UserTable } />
          </Switch>
        </div>
      </Router>
    );
}

export default App
