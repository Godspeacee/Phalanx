"use client";
import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import React from "react";
import { useRouter } from "next/navigation";

interface IssueFrom {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const navigate = useRouter();
  const { register, control, handleSubmit } = useForm<IssueFrom>();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        navigate.push("/issues");
      })}
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description..." {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
