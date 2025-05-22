import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFlitter from "../list/IssueStatusFlitter";

const IssuesToolBar = () => {
  return (
    <Flex mb={"5"} justify={"between"}>
      <IssueStatusFlitter />
      <Button>
        <Link href={"/issues/new"}> New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolBar;
