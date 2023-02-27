import { TbHandRock } from "react-icons/tb";
import { Button } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { postLogout } from "../../DAL/api";

function Overview() {
  const navigate = useNavigate();
  const user = useOutletContext();

  async function logOut() {
    const status = await postLogout();
    if (status) navigate("/");
  }

  return (
    <div>
      <h2>
        Hello, {user.firstName} {user.lastName} <TbHandRock></TbHandRock>
      </h2>
      <Button
        variant="outline-info"
        className="shadow-none px-2 py-1 col-lg-2 mt-4 col-11"
        id="log-out"
        onClick={logOut}
      >
        Log out
      </Button>
    </div>
  );
}

export default Overview;
