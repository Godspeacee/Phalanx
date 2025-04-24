"use client";
import Link from "next/link";
import { GoIssueTracks } from "react-icons/go";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { id: "1", label: "Dashboard", href: "/" },
    { id: "2", label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <GoIssueTracks />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.id}
            className={classnames({
              "text-amber-300": currentPath === link.href,
              "hover:text-amber-300 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
