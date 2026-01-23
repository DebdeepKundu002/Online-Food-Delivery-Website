// // EditProfile.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Editprofile.css";
// import { useAuth } from "../../components/Context/AuthContext"; // ✅ import Auth

// const EditProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const navigate = useNavigate();
//   const { fetchUser } = useAuth(); // ✅ get fetchUser from context

//   const fetchLocalUser = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/v1/user/get", {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("fullname", userData.fullname);
//     formData.append("email", userData.email);
//     formData.append("phoneNumber", userData.phoneNumber);
//     if (selectedFile) {
//       formData.append("profilePhoto", selectedFile);
//     }

//     try {
//       const res = await axios.patch(
//         "http://localhost:8000/api/v1/user/profile/update",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         alert("Profile updated!");
//         await fetchUser(); // ✅ Update context with latest user
//         navigate("/account");
//       } else {
//         alert("Update failed.");
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchLocalUser();
//   }, []);

//   if (!userData) return <div>Loading...</div>;

//   return (
//     <div className="edit-profile-container">
//       <h2>Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Full Name:</label>
//         <input type="text" name="fullname" value={userData.fullname} onChange={handleChange} />

//         <label>Email:</label>
//         <input type="email" name="email" value={userData.email} onChange={handleChange} />

//         <label>Phone Number:</label>
//         <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />

//         <label>Upload New Image (optional):</label>
//         <input type="file" accept="image/*" onChange={handleFileChange} />

//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;


// EditProfile.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Editprofile.css";
// import { useAuth } from "../../components/Context/AuthContext";

// const EditProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();
//   const { fetchUser } = useAuth();

//   const fetchLocalUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/v1/user/get",
//         { withCredentials: true }
//       );
//       if (response.data.success) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("fullname", userData.fullname);
//     formData.append("email", userData.email);
//     formData.append("phoneNumber", userData.phoneNumber);
//     formData.append("bio", userData.profile.bio);


//     try {
//       const res = await axios.patch(
//         "http://localhost:8000/api/v1/user/profile/update",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         alert("Profile updated!");
//         await fetchUser();
//         navigate("/account");
//       } else {
//         alert("Update failed.");
//       }
//     } catch (err) {
//       console.error(
//         "Error updating profile:",
//         err.response?.data || err.message
//       );
//     }
//   };

//   useEffect(() => {
//     fetchLocalUser();
//   }, []);

//   if (!userData) return <div>Loading...</div>;

//   return (
//     <div className="edit-profile-container">
//       <h2>Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Full Name:</label>
//         <input
//           type="text"
//           name="fullname"
//           value={userData.fullname}
//           onChange={handleChange}
//         />

//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={userData.email}
//           onChange={handleChange}
//         />

//         <label>Phone Number:</label>
//         <input
//           type="text"
//           name="phoneNumber"
//           value={userData.phoneNumber}
//           onChange={handleChange}
//         />

//         <label>Bio:</label>
//         <input
//           type="text"
//           name="bio"
//           value={userData.bio}
//           onChange={handleChange}
//         />

//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Editprofile.css";
import { useAuth } from "../../components/Context/AuthContext";

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const fetchLocalUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/get`,
        { withCredentials: true }
      );

      if (response.data.success) {
        const user = response.data.user;

        // ✅ FLATTEN bio here
        setUserData({
          ...user,
          bio: user.profile?.bio || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", userData.fullname);
    formData.append("email", userData.email);
    formData.append("phoneNumber", userData.phoneNumber);
    formData.append("bio", userData.bio); // ✅ correct

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Profile updated!");
        await fetchUser();
        navigate("/account");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchLocalUser();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullname"
          value={userData.fullname}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
        />

        <label>Bio:</label>
        <input
          type="text"
          name="bio"
          value={userData.bio}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
