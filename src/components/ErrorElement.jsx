import { useRouteError } from "react-router-dom";
const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <h4 className="font-bold text-4xl">
      {`there was an error...The Error is ${error}`}
    </h4>
  );
};
export default ErrorElement;
