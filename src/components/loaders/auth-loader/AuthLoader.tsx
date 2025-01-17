import React from "react";
import "./auth-loader.css";

const AuthLoader = () => {
  return (
    <section className="h-screen grid place-items-center">
      <div className="dot-spinner">
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
      </div>
    </section>
  );
};

export default AuthLoader;
