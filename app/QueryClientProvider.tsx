"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryclient = new QueryClient();
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider client={queryclient}>{children}</ReactQueryProvider>
  );
};

export default QueryClientProvider;
