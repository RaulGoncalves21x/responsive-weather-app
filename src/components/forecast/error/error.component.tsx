import { ErrorContainer, ErrorMessage } from "./error.style";

function ErrorComponent() {
  return (
    <ErrorContainer>
      <ErrorMessage>
        <p>Error While Fetching Forecast Data</p>
        <p>Please Try Again</p>
      </ErrorMessage>
    </ErrorContainer>
  );
}

export default ErrorComponent;
