import React from "react";

const UserMagicButton = ({ user, actions }) => {
  const { isAdmin } = user;
  const { becomeCustomer, becomeAdmin } = actions;

  return (
    <div className="col-2 col-magic">
      <button
        className={`btn btn-lg btn-${isAdmin ? "success" : "danger"} btn-magic`}
        onClick={isAdmin ? becomeCustomer : becomeAdmin}
      >
        {isAdmin ? "Become Customer !" : "Become Admin !"}
      </button>
    </div>
  );
};

export default UserMagicButton;
