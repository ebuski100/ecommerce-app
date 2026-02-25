import React from "react";
import { Settings, Bell } from "lucide-react";
const Account = () => {
  return (
    <div>
      <div className="flex flex-row justify-between p-2 fixed top-0 left-0 right-0 bg-white z-30 shadow">
        <div className="flex flex-row">
          <div>E</div>
          <div>User</div>
        </div>
        <div className="flex flex-row ">
          <img src="/nigeria.png" className="mx-2" />
          <Settings size={30} className="mx-2" />
          <Bell size={30} className="mx-2" />
        </div>
      </div>
    </div>
  );
};

export default Account;
