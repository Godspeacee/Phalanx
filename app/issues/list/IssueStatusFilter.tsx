"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";

import { useRouter } from "next/navigation";

const statuses: { label: string; value: Status; key: string }[] = [
  { label: "Open", value: "OPEN", key: "open" },
  { label: "In progress", value: "IN_PROGRESS", key: "in_progress" },
  { label: "Closed", value: "CLOSED", key: "closed" },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.key} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
