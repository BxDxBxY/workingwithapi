import Cookies from "js-cookie";
export default function SetCookie(tokenName, token, expDays) {
  return Cookies.set(tokenName, token, { expires: expDays }); // Expires as day
}
