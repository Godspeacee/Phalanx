import prisma from "@/prisma/clientfile";
import { Box, Button, Grid } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      </Grid>
      <Button>
        <Link href={"/issues"}>Back</Link>
      </Button>
    </>
  );
};

export default IssueDetailPage;
