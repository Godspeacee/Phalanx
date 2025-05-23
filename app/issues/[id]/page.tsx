import prisma from "@/prisma/clientfile";
import { Box, Button, Flex, Grid, Select } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issueId = parseInt(params.id);
  if (isNaN(issueId)) {
    // Avoid Prisma crash
    return notFound();
  }
  console.log("params.id =", params.id);
  console.log("parsed issueId =", issueId);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) notFound();

  return (
    <>
      <Grid columns={{ initial: "1", sm: "5" }} className="mb-5" gap={"5"}>
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction={"column"} gap={"4"}>
              <AssigneeSelect issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
      <Button>
        <Link href={"/issues"}>Back</Link>
      </Button>
    </>
  );
};

export default IssueDetailPage;
