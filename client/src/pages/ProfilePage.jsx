import React, { useState, useContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../utils/AuthContext";
import { Menu, Dropdown, Button, Avatar } from 'antd';
import GardenerProfileComponent from "../components/GardenerProfileComponent";
import HomeownerProfileComponent from "../components/HomeownerProfileComponent";
import { GET_CURRENT_USER } from "../utils/mutations";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  const [profile, setProfile] = useState(null); // Initialize with null

  useEffect(() => {
    if (data && data.getCurrentUser) {
      const { isGardener, isHomeowner } = data.getCurrentUser;
      // If user is a gardener, set profile to 'gardener' by default
      // If user is not a gardener but a homeowner, set profile to 'homeowner'
      // If user is neither a gardener nor a homeowner, set profile to null
      if (isGardener) {
        setProfile('gardener');
      } else if (isHomeowner) {
        setProfile('homeowner');
      } else {
        setProfile(null);
      }
    }
  }, [data]);

  const toggleGardenerProfile = () => {
    setProfile(profile === 'gardener' ? null : 'gardener');
  };

  const toggleHomeownerProfile = () => {
    setProfile(profile === 'homeowner' ? null : 'homeowner');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const userFirstName = data.getCurrentUser.firstName;
  const userLastName = data.getCurrentUser.lastName;
  const userInitials = `${userFirstName.charAt(0)}${userLastName.charAt(0)}`.toUpperCase();

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={toggleGardenerProfile}>
        Gardener Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={toggleHomeownerProfile}>
        Homeowner Profile
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <h1 className="text-4xl text-yard-red text-center my-8">Your Profile</h1>
      <div className="flex justify-center ">
      <Dropdown overlay={menu}>
        <span>
          <Avatar style={{ cursor: "pointer" }} size="large">{userInitials}</Avatar> {/* Replace 'U' with user's initials */}
        </span>
      </Dropdown>
      {profile === 'gardener' && <GardenerProfileComponent />}
      {profile === 'homeowner' && <HomeownerProfileComponent />}
      </div>
    </div>
  );
};

export default ProfilePage;
