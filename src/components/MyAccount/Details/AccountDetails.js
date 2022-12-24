import { Card } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import DetailCard from "./DetailCard";

function AccountDetails() {
  const user = useOutletContext();
  const details = [
    {
      state: ["firstName", "lastName"],
      text: `${user.firstName} ${user.lastName}`,
      title: "Full Name",
    },
    {
      state: ["email", "password"],
      text: `${user.email}`,
      title: "Email",
    },
    {
      state: ["password", "newPassword", "passwordConfirm"],
      text: "*******",
      title: "Password",
    },
  ];

  return (
    <div>
      <Card>
        <Card.Header as="h5">Account Details</Card.Header>
        <Card.Body className="p-4">
          {details.map((property, idx) => (
            <DetailCard key={idx} {...property}></DetailCard>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default AccountDetails;
