import React, { useState, useRef } from 'react';
import { FaFingerprint, FaUserEdit } from "react-icons/fa";
import { MdMarkEmailRead } from 'react-icons/md';
import { FaPhone, FaUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Button, Input } from '@material-tailwind/react';
import { toast } from 'sonner';
import { putResult } from '../api/axiosConfig';

function UserProfile() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImg, setProfileImg] = useState(null); // Use File object here
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Reference to the file input
    const fileInputRef = useRef(null);

    const userField = [
        {
            name: "Profile Image",
            icon: <FaUser size={24} />,
            value: profileImg,
            onChange: () => fileInputRef.current.click(), // Trigger the file input click
            type: 'button' // Not a real input field, handled via the icon click
        },
        {
            name: "Fullname",
            icon: <FaUserEdit size={24} />,
            value: fullname,
            onChange: e => setFullname(e.target.value),
            type: 'text',
        },
        {
            name: "Password",
            icon: <FaFingerprint size={24} />,
            value: password,
            onChange: e => setPassword(e.target.value),
            type: 'password'
        },
        {
            name: "Email",
            icon: <MdMarkEmailRead size={24} />,
            value: email,
            onChange: e => setEmail(e.target.value),
            type: 'email'
        },
        {
            name: "Tel",
            icon: <FaPhone size={24} />,
            value: phoneNumber,
            onChange: e => setPhoneNumber(e.target.value),
            type: 'tel'
        },
    ];

    // Handle the file input change (store the actual File object)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeInKB = file.size / 1024; // Convert bytes to KB
        
            // Check for valid image MIME type
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!validImageTypes.includes(file.type)) {
                toast.error('Please upload a valid image (JPEG, PNG, GIF, or WEBP).');
                return;
            }
        
            // Check the file size limit
            if (fileSizeInKB > 700) {
                toast.error('File size exceeds 700KB. Please upload a smaller image.');
                return;
            }
        
            // Store the actual file (not the URL) in the state
            setProfileImg(file);
        }
    };
    
    

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            // Create a FormData object to handle both text and file data
            const formData = new FormData();
        
            // Append text fields
            formData.append('fullname', fullname);
            formData.append('password', password);
            formData.append('phone_number', phoneNumber);
            formData.append('email', email);
        
            // If profile image is available, append it to the FormData
            if (profileImg) {
                console.log("Uploading file: ", profileImg);
                formData.append('avatar_url', profileImg); // Append the file directly
            } else {
                console.log("No file selected or it's not a valid file.");
            }
        
            // Make the PUT request with the FormData
            const response = await putResult('/api/users/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        
            if (response.status === 200) {
                toast.info(response.data.message);
                setLoading(false)
                return;
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div>
            <div className="md:w-4/5 mx-auto w-full md:pt-5 p-5">
                <div className="text-gray-100 w-fit mx-auto md:flex items-center mt-2 md:text-2xl xl:text-2xl 2xl:text-2xl xs:text-lg sm:text-xl">

                    <Link to={"/"}>
                        <img src="/icon.png" className="w-8 h-8 mx-auto md:mx-4 mb-2 md:mb-0" alt="Logo" />
                    </Link>

                    <section className="text-center md:text-left">
                        <span className="">Edit Profile </span>
                        <h2 className="text-sm text-gray-500 font-normal font-sans">
                            You can double-click each form to update your profile
                        </h2>
                    </section>
                </div>
            </div>

            {/* Creating meeting */}
            <form
                action=""
                className="w-3/4 mx-auto mt-7 md:w-3/5 pb-7 xl:w-2/5 "
                onSubmit={handleProfileUpdate}
                method="post"
            >
                <div className="md:grid grid-cols-12 pt-5 gap-5">
                    {userField.map((field, key) => (
                        <div className={`col-span-6 md:mt-0 ${key === 0 ? 'mt-0' : field.type === "checkbox" ? 'mt-2' : 'mt-3.5'}`}>
                            {/* For Profile Image, use an icon that triggers the file input */}
                            {field.type === 'button' ? (
                                <div onClick={field.onChange} className="cursor-pointer">
                                    {profileImg ? (
                                        <img 
                                            src={URL.createObjectURL(profileImg)} 
                                            alt="Profile Preview" 
                                            className="w-12 h-12 max-w-[150px] rounded-full object-cover" 
                                        />
                                    ) : (
                                        <FaUser size={50} />
                                    )}
                                </div>
                            ) : (
                                <Input
                                    onFocus={field.onFocus}
                                    required={field.required}
                                    variant="standard"
                                    disabled={field.disabled}
                                    label={field.name}
                                    onChange={field.onChange}
                                    value={field.value}
                                    type={field.type}
                                />
                            )}
                            {/* File Input for Profile Image (hidden) */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-5">
                    <Button
                        loading={loading}
                        disabled={loading}
                        type="submit"
                        color="blue"
                        className="capitalize cursor-pointer"
                        size="md"
                        fullWidth
                        role="submit-btn"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;
