const config = {
  appName: "JustVarbs",
  appDescription: "JustVarbs is music game",
  domainName:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://just-varbs.vercel.app/",
};

export default config;
