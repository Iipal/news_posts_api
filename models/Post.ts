import { createSchema, Type, typedModel, ExtractDoc, ExtractProps } from "ts-mongoose";

const PostCommentSchema = createSchema(
  {
    author: Type.string({ required: true }),
    text: Type.string({ required: true }),
  },
  { timestamps: true }
);

export type PostCommentDoc = ExtractDoc<typeof PostCommentSchema>;
export type PostCommentProps = ExtractProps<typeof PostCommentSchema>;

const PostSchema = createSchema(
  {
    title: Type.string({ required: true }),
    description: Type.string({ required: true }),
    views: Type.number({ default: 0 }),
    likes: Type.number({ default: 0 }),
    dislikes: Type.number({ default: 0 }),
    comments: Type.array().of(
      Type.ref(Type.objectId()).to("PostComment", PostCommentSchema)
    ),
    hidden: Type.boolean({ default: false }),
  },
  { timestamps: true }
);

const Post = typedModel("Post", PostSchema);

export type PostDoc = ExtractDoc<typeof PostSchema>;
export type PostProps = ExtractProps<typeof PostSchema>;

export default Post;
