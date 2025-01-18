import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font border-y">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link
          href="/"
          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
        >
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span className="ml-1 text-xl">SeebaStore</span>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} SeebaStore —
          <Link
            href="mailto:haseebahm76.a@gmail.com"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
          >
            haseebahm76.a@gmail.com
          </Link>
        </p>
        <span className="inline-flex gap-2 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <Link
            className="text-blue-600"
            href="https://www.facebook.com/people/Haseeb-Ahmad/pfbid02ZHJyxrurYNaCZ8eL2Y4pweqts2PASNaxhp8jbo9sryaAS2HJ6baMLE5dgnwhd4BHl/"
            target="_blank"
          >
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </Link>
          <Link
            className="text-red-600"
            href="https://www.instagram.com/haseeb_ahmad_47/"
            target="_blank"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
