import { response } from "../../utils";

export const Login = async (req, res) => {
  try {
    res.json("Get started");
  } catch (err) {
    res
      .status(403)
      .json(
        response.success("Ok", { data: "Some random data" }, res.statusCode)
      );
  }
};

export default Login;
