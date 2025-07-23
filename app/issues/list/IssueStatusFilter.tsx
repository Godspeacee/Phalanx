"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentStatus = searchParams.get("status") || "ALL";

  return (
    <Select.Root
      defaultValue={currentStatus}
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "ALL") {
          params.delete("status");
        } else {
          params.set("status", value);
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <Select.Trigger />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value ?? "ALL"}
            value={status.value ?? "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
