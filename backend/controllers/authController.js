import { checkLogin } from "../services/authService.js";

export async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const result = await checkLogin(email, password);

  res.json(result);
}