interface IProps {
  error: string;
}

const ErrorMessage = ({ error }: IProps) => {
  return (
    <span
      style={{
        color: "#d32f2f",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
        textAlign: "left",
        marginTop: "3px",
        marginRight: "14px",
        marginBottom: "0",
        marginLeft: "14px",
      }}
    >
      {error}
    </span>
  );
};

export default ErrorMessage;
