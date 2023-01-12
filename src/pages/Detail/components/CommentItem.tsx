import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type CommentItemProps = {
  id?: string;
  text: string;
  writer: string;
  publishDate?: string;
  userProfileImagePath: string;
  replyNum?: string;
  isReply: boolean;
};

const CommentItem = ({ id, text, writer, publishDate, userProfileImagePath, replyNum, isReply }: CommentItemProps) => {
  const [commentIsNew, setCommentIsNew] = useState(false);

  const formattedPublishDate = publishDate?.slice(2, 16).split('T').join(' ').replaceAll('-', '.');
  const nowDate = new Date();
  const commentDate = publishDate && new Date(publishDate);

  useEffect(() => {
    commentDate && (nowDate.getTime() - commentDate.getTime()) / (1000 * 60 * 60) <= 24
      ? setCommentIsNew(true)
      : setCommentIsNew(false);
  }, []);

  return (
    <CommentTextWrapper>
      <div>
        <UserImage src={userProfileImagePath} />
      </div>
      <CommentInfo>
        <Writer>{writer}</Writer>
        <PublishDate>
          <span>{formattedPublishDate}</span>
          {commentIsNew && <NewCommentBadge>N</NewCommentBadge>}
        </PublishDate>
      </CommentInfo>
      <CommentText>{text}</CommentText>
    </CommentTextWrapper>
  );
};

export default CommentItem;

const CommentTextWrapper = styled.div`
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;

const UserImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
`;
const CommentInfo = styled.div`
  margin-left: 12px;
  font-size: ${(props) => props.theme.fontSize.body02};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  > span:first-child {
  }
`;

const Writer = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const PublishDate = styled.div`
  position: relative;
  color: ${(props) => props.theme.colors.grey1};
`;

const NewCommentBadge = styled.span`
  display: inline-block;
  position: absolute;
  top: -1px;
  width: 22px;
  height: 22px;
  margin-left: 4px;
  line-height: ${(props) => props.theme.lineHeight.lh22};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.notice1};
  border-radius: 50%;
`;

const CommentText = styled.div`
  flex: 1;
  word-wrap: break-word;
  margin: 0 40px 0 50px;
  font-size: ${(props) => props.theme.fontSize.body02};
`;
