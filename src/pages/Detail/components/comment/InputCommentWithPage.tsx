import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import InputComment from './InputComment';
import InputPageButton from './InputPageButton';
import { postComments } from '../../../../apis/comment';

type InputCommentProps = {
  className: string;
  placeholder: string;
};

const InputCommentWithPage = ({ className, placeholder }: InputCommentProps) => {
  const queryClient = useQueryClient();
  const maxPage = '524'; //서버에서 받아올 값
  const [targetPage, setTargetPage] = useState('0');
  const params = useParams();
  const isbn = params.id!;

  const onChangeTargetPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value.replace(/[^0-9.]/g, '');
    setTargetPage(enteredValue);
  };
  const [commentContent, setCommentContent] = useState<string>('');

  const data = {
    content: commentContent,
    page: targetPage,
  };

  const postCommentMutate = useMutation(() => postComments(isbn, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
      setCommentContent('');
    },
  });

  const onClickSubmit = () => {
    postCommentMutate.mutate();
  };

  return (
    <InputCommentWrapper
      className={className}
      placeholder={placeholder}
      onClick={onClickSubmit}
      commentContent={commentContent}
      changeCommentContent={setCommentContent}
    >
      <InputPageWrapper>
        <span>책 페이지</span>
        <InputPageButton value={targetPage} className="pageInput" onChange={onChangeTargetPage} maxPage={maxPage} />
      </InputPageWrapper>
    </InputCommentWrapper>
  );
};

export default InputCommentWithPage;

const InputCommentWrapper = styled(InputComment)`
  /* display: flex; */
`;

const InputPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid ${(props) => props.theme.colors.grey4};
  > span {
    font-size: ${(props) => props.theme.fontSize.body02};
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;
