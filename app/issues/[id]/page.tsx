import prisma from "@/prisma/clientfile";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

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
      <Grid columns={{ initial: "1", sm: "5" }} className="mb-5" gap={"5"}>
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      </Grid>
      <Button>
        <Link href={"/issues"}>Back</Link>
      </Button>
    </>
  );
};

export default IssueDetailPage;
