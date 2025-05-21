import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/app/components";
import IssuesToolBar from "./IssuesToolBar";

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <>
      <IssuesToolBar />
      <div>
        <div className="mb-5">
          <Button>
            <Link href={"/issues/new"}> New Issue</Link>
          </Button>
        </div>

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
              <Table.Row key={issue}>
                <Table.ColumnHeaderCell>
                  <Skeleton />
                  <div className="block md:hidden">
                    <Skeleton />
                  </div>
                </Table.ColumnHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {" "}
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
};

export default LoadingIssuesPage;
