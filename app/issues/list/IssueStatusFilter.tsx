"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status; key: string }[] = [
  { label: "All", key: "all" },
  { label: "Open", value: "OPEN", key: "open" },
  { label: "In progress", value: "IN_PROGRESS", key: "in_progress" },
  { label: "Closed", value: "CLOSED", key: "closed" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.key} value={status.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
