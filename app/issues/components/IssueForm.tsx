"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchma } from "@/app/validationSchma";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Fiject from "@/app/components/Fiject";
import { Issue } from "@/app/generated/prisma";

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),

  { ssr: false }
);

type IssueFormData = z.infer<typeof issueSchma>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(issueSchma) });
  const [error, setError] = useState("");
  const [isSubmitting, setIssueSubmitting] = useState(false);
  const onsubmit = handleSubmit(async (data) => {
    try {
      setIssueSubmitting(true);
      if (issue) await axios.patch("/api/issues" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIssueSubmitting(false);
      setError("Error creating issue");
    }
  });
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

        <Button disabled={isSubmitting}>
          {" "}
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Fiject />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
