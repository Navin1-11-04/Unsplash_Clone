import React, { useState } from 'react';
import axios from 'axios';
import '../styles/nav.css';
import Logo from '../assets/my_unsplash_logo.svg'
function Navbar() {
  const [label, setLabel] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showForm, setShowForm] = useState(false);

  const openHiddenMenu = () => {
    const hiddenMenuNavGroup = document.querySelector('.hidden-menu-nav-group');
    hiddenMenuNavGroup.classList.toggle('active');
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/addposts', {
        label,
        imageUrl
      });
      if (response.status === 201) {
        alert('Post added successfully');
        setLabel('');
        setImageUrl('');
        setShowForm(false);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Error adding post');
    }
  };

  return (
    <div className="nav-wrapper d-flex">
      <div className="nav-container">
        <div className="nav-group d-flex">
          <span id="logo"><img src={Logo} alt="logo" /></span>
          <span className="search-container">
            <input type="text" placeholder="Search.." id="search-bar" aria-label="Search bar" />
            <button className="d-flex" id="search-btn" aria-label="Search button" data-tooltip="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </span>
        </div>
        <div className="nav-group d-flex">
          <button
            className="add-btn d-flex"
            aria-label="Add button"
            data-tooltip="Add"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button className="profile-btn d-flex" aria-label="Profile button" data-tooltip="Profile">
            <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </div>
      <span className="hidden-menu-btn" onClick={openHiddenMenu}>
        <i className="fa-solid fa-bars"></i>
      </span>
      <div className="hidden-menu-nav-group">
      <div className="hidden-nav-group d-flex">
      <h3 style={{color:"#fff"}}>MENU</h3>
          <span className='hidden-nav-item'>
            <i className="fa-solid fa-plus"></i>
            <p>Add post</p>
          </span>
          <span className='hidden-nav-item'>
          <i className="fa-solid fa-user"></i>
          Profile
          </span>
        </div>
      </div>
      {showForm && (
        <form className="add-post-form" onSubmit={handleAddPost}>
          <h3 style={{marginBottom:'10px'}}>Add Post</h3>
          <input
            type="text"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Navbar;
