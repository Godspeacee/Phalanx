"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Fiject from "@/app/components/Fiject";
import { Issue } from "@/app/generated/prisma";
import { issueSchma, patchIssueSchma } from "@/app/validationSchma";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Grid, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { z } from "zod";
import { Status } from "@/app/generated/prisma";

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),

  { ssr: false }
);

type IssueFormData = z.infer<typeof patchIssueSchma>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(patchIssueSchma) });
  const [error, setError] = useState("");
  const [isSubmitting, setIssueSubmitting] = useState(false);
  const onsubmit = handleSubmit(async (data) => {
    try {
      setIssueSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIssueSubmitting(false);
      setError("Error creating issue");
    }
  });
  const statusOptions = Object.entries(Status); // [['OPEN', 'Open'], ['IN_PROGRESS', 'In Progress'], ...]

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onsubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage> {errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage> {errors.description?.message}</ErrorMessage>
        <Grid gap={"4"}>
          {issue && (
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select.Root onValueChange={field.onChange} value={field.value}>
                  <Select.Trigger placeholder="Select status..." />
                  <Select.Content>
                    {statusOptions.map(([key, label]) => (
                      <Select.Item key={key} value={label}>
                        {label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
          )}
          <ErrorMessage>{errors.status?.message}</ErrorMessage>
          <Button disabled={isSubmitting}>
            {" "}
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
            {isSubmitting && <Fiject />}
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default IssueForm;
