import Cookies from "js-cookie";

export default function DeleteCookie() {
  const allCookies = Cookies.get();
  console.log(allCookies)
  for (let cookieName in allCookies) {
    Cookies.remove(cookieName);
  }
}
