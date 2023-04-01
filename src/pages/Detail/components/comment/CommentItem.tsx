import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { doc, onSnapshot } from 'firebase/firestore';
import { appFireStore } from '../../../../firebase/config';

const CommentItem = ({ item }: any) => {
  const [data, setData]: any = useState(null);
  const [commentIsNew, setCommentIsNew] = useState(false);
  const nowDate = new Date();

  useEffect(() => {
    item?.date && (nowDate.getTime() - new Date(item?.date).getTime()) / (1000 * 60 * 60) <= 24
      ? setCommentIsNew(true)
      : setCommentIsNew(false);
  }, []);

  useEffect(() => {
    // 문서를 참조합니다.
    const docRef = doc(appFireStore, 'userInfo', item?.uid);

    // onSnapshot 함수는 가장 최신의 문서 데이터를 반환하는 함수입니다. 함수는 데이터 수신을 중단하기 위한 unsubscribe 함수를 반환합니다. 더 이상 데이터를 수신 대기할 필요가 없을 때 사용합니다.
    onSnapshot(
      docRef,
      // 응답받은 문서가 snapshot에 저장됩니다.
      (snapshot) => {
        if (snapshot.exists()) {
          // 문서 데이터를 가져와 state를 업데이트합니다.
          setData({ ...snapshot.data() });
        } else {
          // 문서가 없을 때는 null로 설정합니다.
          setData(null);
        }
      },
      (error: any) => {
        console.error(error);
      },
    );
  }, []);
  return (
    <CommentTextWrapper key={item.id}>
      <CommentInfo>
        <UserImageWrapper>
          <UserImage src={data?.photoURL} />
        </UserImageWrapper>
        <div>
          <Writer>{data?.displayName}</Writer>
          <PublishDate>
            <span>{item?.date}</span>
            {commentIsNew && <NewCommentBadge>N</NewCommentBadge>}
          </PublishDate>
        </div>
      </CommentInfo>
      <CommentText>{item?.commentContent}</CommentText>
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
  ${(props) => props.theme.media.tablet`
    flex-direction: column;
  `}
`;

const UserImageWrapper = styled.div`
  margin-right: 10px;
`;
const UserImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  ${(props) => props.theme.media.tablet`
    width: 32px;
    height: 32px;
  `}
`;
const CommentInfo = styled.div`
  display: flex;
  margin-left: 12px;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.body02};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  & > span:first-child {
  }

  ${(props) => props.theme.media.tablet`
      width: 100%;
    /* margin: 0 auto; */
    // justify-content: center;
  `}
`;

const Writer = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const PublishDate = styled.div`
  position: relative;
  color: ${(props) => props.theme.colors.grey1};
  ${(props: any) => props.theme.media.tablet`
    display: inline-block;
    margin-left: 10px;
  `}
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
  ${(props) => props.theme.media.tablet`
  width: 100%;
  margin-top: 8px;
  `}
`;
