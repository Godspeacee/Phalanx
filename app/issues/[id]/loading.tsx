import { Flex, Card, Button, Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssueDetailPage = () => {
  return (
    <>
      <Box className="max-w-xl">
        <Skeleton />
        <Flex className="gap-3" my="2">
          <Skeleton width={"5rem"} />
          <Skeleton width={"8rem"} />
        </Flex>
        <Card mt={"4"}>
          <Skeleton count={5} />
        </Card>
      </Box>
      <Button>
        <Skeleton />
      </Button>
    </>
  );
};

export default LoadingIssueDetailPage;
