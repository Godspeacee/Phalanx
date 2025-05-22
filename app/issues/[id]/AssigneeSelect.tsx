"use client";
import { Issue, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { Skeleton } from "@/app/components";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 10 * (60 * 1000), // 10 minutes
    retry: 3,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;
  const assignIssue = async (userId: string) => {
    await axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId,
      })
      .catch(() => {
        toast.error("Failed to assign user");
      });
  };
  return (
    <>
      <Select.Root onValueChange={assignIssue}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Sugguestion</Select.Label>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {" "}
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
