import { useContext } from "react";
import LabTabs from "./components/LabTabs";
import SessionContext from "../../context/sessionContext";

export default function Account() {
  const { user, loading } = useContext(SessionContext);
  if (loading) {
    return;
  }
  if (!user) {
    return;
  }

  return (
    <div className="container-fluid d-flex flex-column mt-5">
      <div className="row">
        <h1 className="white-1 mb-4">
          Account: {user.user_metadata.first_name}
        </h1>
      </div>
      <div className="row">
        <div className="col-12">
          <LabTabs />
        </div>
      </div>
    </div>
  );
}
