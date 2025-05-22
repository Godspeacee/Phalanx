"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AiOutlineIssuesClose } from "react-icons/ai";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { id: "1", label: "Dashboard", href: "/" },
    { id: "2", label: "Issues", href: "/issues" },
  ];
  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          <Link href={"/"}>
            <AiOutlineIssuesClose />
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  className={classnames({
                    "text-purple-600": currentPath === link.href,
                    "hover:text-purple-400 transition-colors": true,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
          {" "}
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user!.image!}
                  fallback="?"
                  size={"2"}
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size={"2"}>{session.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link
                    className={classnames({
                      "text-purple-600": currentPath === "api/auth/signout",
                      "hover:text-purple-400 transition-colors": true,
                    })}
                    href="/api/auth/signout"
                  >
                    Log Out
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link
              className={classnames({
                "text-purple-600": currentPath === "api/auth/signin",
                "hover:text-purple-400 transition-colors": true,
              })}
              href="/api/auth/signin"
            >
              Login
            </Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
