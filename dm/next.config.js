/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const nextConfig = {
    reactStrictMode: false,
}

module.exports = withPlugins(
  [
      [
        withPWA,
        {
            pwa: {
              dest: "public",
            },
        },
      ],
      // 추가 플러그인 작성
  ],
  nextConfig
);

/* 

const path = require("path");
const withPWAInit = require("next-pwa");

const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
      const entry = generateAppDirEntry(config.entry);
      config.entry = () => entry;
  
      return config;
    },
  };
  

const withPWA = withPWAInit({
  dest: "public",
  buildExcludes: ["app-build-manifest.json"],
});

const generateAppDirEntry = (entry) => {
  const packagePath = require.resolve('next-pwa');
  const packageDirectory = path.dirname(packagePath);
  const registerJs = path.join(packageDirectory, "register.js");

  return entry().then((entries) => {
    if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
      if (Array.isArray(entries["main-app"])) {
        entries["main-app"].unshift(registerJs);
      } else if (typeof entries["main-app"] === "string") {
        entries["main-app"] = [registerJs, entries["main-app"]];
      }
    }
    return entries;
  });
};



module.exports = withPWA(nextConfig); */