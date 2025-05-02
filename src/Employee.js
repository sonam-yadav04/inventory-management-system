// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Profile() {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/profile')
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching accounts:', error);
//       });
//   }, []);

//   return (
//     <div className='profile-container'>
//       <h2 className='profile-h2'>All Employees</h2>
//       <table className='emp-table'>
//         <thead className='emp-thead '>
//           <tr>
//             <th>ID</th><th>Username</th><th>Email</th><th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map(emp => (
//             <tr key={emp.id}>
//               <td>{emp.id}</td>
//               <td>{emp.username}</td>
//               <td>{emp.email}</td>
//               <td>{emp.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Profile;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState([]);

  useEffect(()=>{
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized. Please login.");
        }
      });
  };

  const handleEdit = (index)=>{
    setEditIndex(index);
    setEditedEmployee(employees[index]);
  };

  const handleChange = (e)=>{
    setEditedEmployee({...editedEmployee, [e.target.name]: e.target.value});
  };

  const handleUpdate = async (id) => {
    try{
         await axios.put(`http://localhost:5000/employees/${id}`,editedEmployee);
         alert('Employee updated successfully');
         setEditIndex(null);
         fetchEmployees();
       } catch (err) {
         console.error(err);
         alert('Failed to update');
    }
  };

  return (
    <div className='emp-container'>
      <h2 className='emp-h2'>All Employees</h2>
      <table className='emp-table'>
        <thead className='emp-thead'>
          <tr>
            <th>ID</th><th>Username</th><th>Email</th><th>salary</th><th>Role</th>
          </tr>
        </thead>
        <tbody className='emp-tbody'> 
          {employees.map((emp,index) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>
                {editIndex === index ? (
                  <input name="username" value={editedEmployee.username} onChange={handleChange} />
                ) : (
                  emp.username
                )}
              </td>
              <td>
              { editIndex === index ? (
                <input name = "email" value= {editedEmployee.email} onChange={handleChange}/> ):
                ( emp.email)}
              </td>
                <td>
              { editIndex === index ?(
              <input name = "salary" value ={editedEmployee.salary} onChange={handleChange}/>):(emp.salary)}</td>
              <td>
               { editIndex === index ?(
              <input name = "role" value ={editedEmployee.role} onChange={handleChange}/>):(emp.role)}</td>

            <td>
                {editIndex === index ? (
                  <>
                    <button onClick={() => handleUpdate(emp.id)}>Save</button>
                    <button onClick={() => setEditIndex(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
