import Cookies from "js-cookie";

function GetCookie(cookieName) {
  const token = Cookies.get(cookieName);
  return token;
}
export default GetCookie;
