import prisma from "@/prisma/clientfile";
import { Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import IssuesToolBar from "./IssuesToolBar";
import { Status } from "../../generated/prisma";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: { status: Status; page: string };
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
      <div>
        <IssuesToolBar />
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.ColumnHeaderCell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.ColumnHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {" "}
                  {issue.createdAt.toDateString()}{" "}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
