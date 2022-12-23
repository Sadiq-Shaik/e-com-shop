// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { verifyPassword } from "../../../lib/auth";
// import { connectToDb } from "../../../lib/db";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       session: {
//         jwt: true,
//       },
//       credentials: {
//         async authorize(credentials) {
//           const client = await connectToDb();
//           const usersCollection = client.db.collection("users");

//           const user = await usersCollection.findOne({
//             email: credentials.email,
//           });

//           if (!user) {
//             throw new Error("No User Found");
//           }

//           const isVerified = await verifyPassword(
//             credentials.password,
//             user.password
//           );

//           console.log(user, isVerified, credentials.password, user.password);

//           if (!isVerified) {
//             client.close();
//             throw new Error("Incorrect password");
//           }

//           client.close();
//           return { email: user.email };
//         },
//       },
//     }),
//   ],
// });
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDb } from "../../../lib/db";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      //   credentials: {
      //     username: { label: "Username", type: "text", placeholder: "jsmith" },
      //     password: { label: "Password", type: "password" },
      //   },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // // Return null if user data could not be retrieved
        // return null;

        /////////////////////////////////////////////////////
        const client = await connectToDb();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No User Found");
        }

        const isVerified = await verifyPassword(
          credentials.password,
          user.password
        );

        // console.log(user, isVerified, credentials.password, user.password);

        if (!isVerified) {
          client.close();
          console.error("Incorrect Password");
          //   throw new Error("Incorrect password");
          return null;
        }

        client.close();

        return { email: user.email };
        /////////////////////////////////////////////////////////////
      },
    }),
  ],
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true;
    //   console.log("user :>> ", user);
    //   if (isAllowedToSignIn) {
    //     return true;
    //   } else {
    //     // Return false to display a default error message
    //     return false;
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
    // async jwt({ token, account, profile }) {
    //   //   // Persist the OAuth access_token and or the user id to the token right after signin
    //   //   if (account) {
    //   //     token.accessToken = account.access_token;
    //   //     token.id = profile.id;
    //   //   }
    //   //   return token;
    //   //   console.log("------------------------------------------------");
    //   //   console.log("jwt", user);
    //   //   console.log("------------------------------------------------");
    //   console.log("token :>> ", token);
    //   return token;
    // },
    // async session({ session, token }) {
    //   // Send properties to the client, like an access_token and user id from a provider.
    //   //   session.accessToken = token.accessToken;
    //   //   session.user = {
    //   //     email: token.user.email,
    //   //   };
    //   //   session.user = user;
    //   // console.log("session");
    //   // console.log(token);
    //   // console.log("-----------");
    //   //   console.log("------------------------------------------------");
    //   //   console.log("session", user, session, token);
    //   //   console.log("------------------------------------------------");
    //   return { session };
    // },
  },
});
