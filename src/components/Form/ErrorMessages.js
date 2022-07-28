function ErrorMessages(props) {
  return (
    <div>
      {props.errors.map((error, idx) => (
        <p key={idx} className="error mb-1">
          {error}
        </p>
      ))}
    </div>
  );
}

export default ErrorMessages;
