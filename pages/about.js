function About() {
  return (
    <div className="w-3/4 mx-auto my-6">
      <h2 className="text-2xl my-4">About Me</h2>
      <h3 className="text-xl">I'm Sadiq Shaik</h3>
      <span className="text-sm">Front-end developer</span>
      <p className="my-4 text-lg">
        I build user-interfaces using React library. Currently learning NextJS
        and TypeScript for building full-stack apps. Know more about me:{" "}
        <a className="underline" href="https://sadiqshaik.com">
          here.
        </a>{" "}
      </p>
      <p className="my-4 text-lg">
        This web app is build using NextJS framework and MongoDb with
        Authentication and shopping cart funcionality. Although cart data
        persistance for a particular user in databse hasn't been implemented yet
        and might be added later along side user-profile page.{" "}
        <a className="underline" href="https://sadiqshaik.com">
          Contact me
        </a>{" "}
        if you have any suggestions or if you have found some bugs.
      </p>

      <p className="my-4 text-lg">Thanks for visiting my page!</p>
    </div>
  );
}

export default About;
