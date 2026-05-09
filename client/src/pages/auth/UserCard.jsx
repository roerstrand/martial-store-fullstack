import React from "react";

function UserCard({ firstName, lastName, email }) {
  return (
    <div className="user-card">
      <p className="user-card__name">{firstName} {lastName}</p>
      <p className="user-card__email">{email}</p>
    </div>
  );
}

export default UserCard;
