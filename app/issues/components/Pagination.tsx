import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import DoubleArrowLeftIcon from "./DoubleArrowLeftIcon";
import DoubleArrowRightIcon from "./DoubleArrowRightIcon";
import ChevronRightIcon from "./ChevronRightIcon";
import ChevronLeftIcon from "./ChevronLeftIcon";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex align={"center"} gap={"2"}>
      <Text size={"2"}>
        Page{currentPage} of {pageCount}
      </Text>
      <Button disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
      <Button disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
