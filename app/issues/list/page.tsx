import prisma from "@/prisma/clientfile";
import { Status } from "../../generated/prisma";
import Pagination from "../components/Pagination";
import IssuesToolBar from "./IssuesToolBar";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statues = Object.values(Status);

  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const page = parseInt(searchParams.page) || 1;
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
        <IssueTable searchParams={searchParams} issues={issues} />
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
export default IssuesPage;
