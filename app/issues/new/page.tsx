"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchma } from "@/app/validationSchma";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Fiject from "@/app/components/Fiject";

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),

  { ssr: false }
);

type IssueFrom = z.infer<typeof createIssueSchma>;

const NewIssuePage = () => {
  const navigate = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFrom>({ resolver: zodResolver(createIssueSchma) });
  const [error, setError] = useState("");
  const [isSubmitting, setIssueSubmitting] = useState(false);
  const onsubmit = handleSubmit(async (data) => {
    try {
      setIssueSubmitting(true);
      await axios.post("/api/issues", data);
      navigate.push("/issues");
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
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage> {errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage> {errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {" "}
          Submit New Issue {isSubmitting && <Fiject />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
