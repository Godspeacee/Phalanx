import prisma from "@/prisma/clientfile";
import { Status } from "../../generated/prisma";
import Pagination from "../components/Pagination";
import IssuesToolBar from "./IssuesToolBar";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const statues = Object.values(Status);

  const status = statues.includes(params.status) ? params.status : undefined;
  const where = status ? { status } : {};
  const page = parseInt(params.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <>
      <Flex direction={"column"} gap={"3"}>
        <IssuesToolBar />
        <IssueTable searchParams={params} issues={issues} />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </Flex>
    </>
  );
};
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Phalanx - Issue List",
  description: "View all issues in the project",
};

export default IssuesPage;
