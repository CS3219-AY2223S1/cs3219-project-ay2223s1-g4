import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AUTH0_DOMAIN } from "../../configs";

const Profile = () => {
  const { user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>Nickname (Other users can see)</h2>
        <body1>{user.nickname}</body1>
        <h2>Email</h2>
        <p>{user.email}</p>
        {}
      </div>
    )
  );
};

export default Profile;
