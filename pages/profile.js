import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Profile() {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/login");
    },
  });

  if (status === "loading") {
    return <h2>Loading... Pls Wait</h2>;
  }

  console.log(session);

  return (
    <div className="w-3/4 flex flex-col gap-4 mx-auto my-4 text-center">
      <h3 className="text-2xl">My Profile</h3>
      <p className="text-lg">
        A secret page of user with email:
        <span className="underline"> {session.user.email}</span>, which is
        accessible by that user alone, and later you would be able to submit
        forms for updating profile like address, change password, phone number
        etc.
      </p>
    </div>
  );
}

export default Profile;
