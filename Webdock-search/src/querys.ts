import {
  PrismaClient,
  Category,
  Status,
  User,
  FeatureRequest,
  Comment,
  CommentReply,
  FeatureUpvote,
} from "@prisma/client";

const prisma = new PrismaClient();

class querys {
  a = async () => {
    const test: Category | null = await prisma.category.findFirst();
    console.log(test);
    return test;
  };
}



export default new querys();
