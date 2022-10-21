import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";

function PasswordRequirementAlert() {
  return (
    <Alert variant="success">
      <Alert.Heading>
        Password requirements{"  "}
        <Badge pill bg="info">
          Must fulfill
        </Badge>
      </Alert.Heading>
      <p className="mb-0">
        Your password must contain: At least 8 characters and At least 3 of the
        following:
      </p>
      <p> - Lower case letters (a-z) </p>
      <p> - Upper case letters (A-Z)</p>
      <p> - Numbers (0-9) </p>
      <p> - Special characters (e.g. !@#$%^&*)</p>
    </Alert>
  );
}

export default PasswordRequirementAlert;
