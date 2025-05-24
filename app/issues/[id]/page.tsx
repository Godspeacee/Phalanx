import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/clientfile";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkDown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <>
      <div className="mb-5">
        <Heading>{issue.title}</Heading>
        <Flex className="gap-3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text> {issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt={"4"}>
          <ReactMarkDown>{issue.description}</ReactMarkDown>
        </Card>
      </div>
      <Button>
        <Link href={"/issues"}>Back</Link>
      </Button>
    </>
  );
};

export default IssueDetailPage;
