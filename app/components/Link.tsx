import NextLink from "next/link";
import { Link as RadiuxLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
}

const Link = ({ href, children }: Props) => {
  return (
    <RadiuxLink asChild>
      <NextLink href={href}>{children}</NextLink>
    </RadiuxLink>
  );
};

export default Link;
