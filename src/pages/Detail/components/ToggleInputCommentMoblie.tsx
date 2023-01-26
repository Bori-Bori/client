import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import InputComment from './InputComment';
import { postComments } from '../../../apis/comment';
import InputPageButton from './InputPageButton';
import closeIcon from '../../../assets/icons/close-bk-24.png';
import writeIcon from '../../../assets/icons/write_br_24.png';
import commentInputHeight from '../../../recoil/commentInputHeight';

const ToggelInputCommentMoblie = () => {
  const maxPage = '524'; //서버에서 받아올 값
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [inputHeight, setInputHeight] = useRecoilState(commentInputHeight);
  const [inputIsOpen, setInputIsOpen] = useState(false);
  const [commentContent, setCommentContent] = useState<string>('');
  const [targetPage, setTargetPage] = useState('0');

  const queryClient = useQueryClient();
  const params = useParams();
  const isbn = params.id!;

  // useEffect(() => {
  //   inputHeight ? setInputHeight(inputWrapperRef.current!.clientHeight) : '';
  //   // console.log(inputWrapperRef.current?.clientHeight);
  // }, [inputHeight]);

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

  const ToggleInputHandler = () => {
    setInputIsOpen((prev) => !prev);
    // setTimeout(() => {
    //   const inputHeight = inputWrapperRef.current?.clientHeight || 1;
    //   setInputHeight(inputHeight);
    // }, 1);
  };

  const onClickSubmit = () => {
    postCommentMutate.mutate();
  };

  const onChangeTargetPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value.replace(/[^0-9.]/g, '');
    setTargetPage(enteredValue);
  };

  return (
    <CommentInputContainter>
      {inputIsOpen && (
        <CommentInputWrapper ref={inputWrapperRef}>
          <CommentInputTitle>
            <span>댓글쓰기</span>
            <img src={closeIcon} onClick={ToggleInputHandler} />
          </CommentInputTitle>
          <PageInfo>책 페이지</PageInfo>
          <InputPageButton className="commentPage" value={targetPage} maxPage={maxPage} onChange={onChangeTargetPage} />
          <StyledInputComment
            className="pageInputMobile"
            placeholder="댓글을 입력하세요"
            onClick={onClickSubmit}
            commentContent={commentContent}
            changeCommentContent={setCommentContent}
          />
        </CommentInputWrapper>
      )}
      {!inputIsOpen && (
        <WriteCommentButton onClick={ToggleInputHandler}>
          <img src={writeIcon} />
          <span>댓글 쓰기</span>
        </WriteCommentButton>
      )}
    </CommentInputContainter>
  );
};

export default ToggelInputCommentMoblie;

const CommentInputContainter = styled.div`
  display: none;
  ${(props) => props.theme.media.tablet`
  display: block;
  `}
`;
const CommentInputWrapper = styled.div`
  ${(props) => props.theme.media.tablet`
  display: block;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${(props: any) => props.theme.colors.white}; 
  padding: 17px 20px;
`}
`;

const CommentInputTitle = styled.div`
  margin-bottom: 9px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.body01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.lh22};
  > img {
    float: right;
  }
`;

const PageInfo = styled.span`
  display: block;
  margin-bottom: 9px;
  font-size: ${(props) => props.theme.fontSize.body02};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.lh20};
`;

const StyledInputComment = styled(InputComment)`
  margin-top: 9px;
`;

const WriteCommentButton = styled.div`
  display: none;
  ${(props) => props.theme.media.tablet`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: ${(props: any) => props.theme.colors.primary};
    padding: 20px 20px;
    color: #643C00;
    font-size: ${(props: any) => props.theme.fontSize.body01};
    font-weight: ${(props: any) => props.theme.fontWeight.bold};
    line-heitght: ${(props: any) => props.theme.lineHeight.lh22};
    > img {
      margin-right: 7px;
    }
`}
`;
