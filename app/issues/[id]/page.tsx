import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/clientfile";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import { ImPencil2 } from "react-icons/im";

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
      <Grid columns={{ initial: "1", md: "2" }} className="mb-5" gap={"5"}>
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex className="space-x-3" my="2">
            <IssueStatusBadge status={issue.status} />
            <Text> {issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose" mt={"4"}>
            <ReactMarkDown>{issue.description}</ReactMarkDown>
          </Card>
        </Box>
        <Box>
          <Button>
            <ImPencil2 />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
      </Grid>
      <Button>
        <Link href={"/issues"}>Back</Link>
      </Button>
    </>
  );
};

export default IssueDetailPage;
