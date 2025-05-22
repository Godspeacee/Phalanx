"use client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { Status } from "../generated/prisma";

const statues: { label: string; value?: Status; key: string }[] = [
  { label: "All", key: "all" },
  { label: "Open", value: "OPEN", key: "open" },
  { label: "In Progress", value: "IN_PROGRESS", key: "in progress" },
  { label: "Closed", value: "CLOSED", key: "closed" },
];

const IssueStatusFlitter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Flitter by status...."></Select.Trigger>
      <Select.Content>
        {statues.map((statue) => (
          <Select.Item key={statue.key} value={statue.value || "All"}>
            {statue.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFlitter;
