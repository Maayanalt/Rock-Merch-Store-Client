function ErrorMessages({ errors }) {
  return (
    <div>
      {errors.map((error, idx) => (
        <p key={idx} className="error mb-1">
          {error}
        </p>
      ))}
    </div>
  );
}

export default ErrorMessages;
