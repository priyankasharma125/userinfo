import React, { useState, useEffect } from 'react';
import './User.css';
const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [pastSearches, setPastSearches] = useState([]);
  useEffect(() => {
    
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
  }, [pastSearches]);
  
  useEffect(() => {
    const storeSearches = JSON.parse(localStorage.getItem('pastSearches')) ;
    setPastSearches(storeSearches);
  }, []);
  
  const Search = () => {
    setPastSearches([...pastSearches, search]);
 };
  

 
  const SortByName = () => {
    const sortUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortUsers);
  };

  return (
    <div className='user'>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={Search}>Search</button>


      <button onClick={SortByName}>Sort by Name</button>

      <div className='pastsearch'>
        Past Searches: {pastSearches.join(', ')}
      </div>

  <h1>List of users</h1>
      <ul>
        {users.filter((user)=>{
          return user.name.toLowerCase().includes(search.toLowerCase());
        })
        .map(user => (
          <li  key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;