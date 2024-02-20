import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Login = async () => {
  const verifyResult = await checkToken();

  if (verifyResult) {
    redirect("/");
  } else {
    return <div>this is login page</div>;
  }
  //
};

const checkToken = async (): Promise<boolean> => {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  console.log(">> allCookies", allCookies);
  const token = cookieStore.get("access_token");
  if (token) {
    const verifyRequest = await fetch(
      process.env.NEXT_PUBLIC_CF_AUTH_URL + "/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          client_id: "6fe5d1b6708dce26e989",
          client_secret:
            "QsH7hDHaOaFuU4RO/n34rh+tfwUupdxNhp8vNoamBjkPVb8x2bTrVw==",
          token: "OzgWUFe3kWNsq4vQ8oP2euWleEa1UddHiTi6OEB30TY"
        })
      }
    );
    return true;
  }
  return false;
};

export default Login;
