import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { contentTypeState, showContentTypeState } from '../../../../recoil/search';

const ContentTypeList = () => {
  const setContentType = useSetRecoilState(contentTypeState);
  const [showContentList, setShowContentList] = useRecoilState(showContentTypeState);

  const isContentList = () => {
    setShowContentList(!showContentList);
  };

  return (
    <ContentTypeListWrap>
      <ul>
        <li>
          <ContentTypeInput
            type="radio"
            name="contentType"
            id="제목+글쓴이"
            onClick={isContentList}
            onChange={() => {
              setContentType('Keyword');
            }}
          />
          <ContentTypeLabel htmlFor="제목+글쓴이">제목+글쓴이</ContentTypeLabel>
        </li>
        <li>
          <ContentTypeInput
            type="radio"
            name="contentType"
            id="제목"
            onClick={isContentList}
            onChange={() => {
              setContentType('Title');
            }}
          />
          <ContentTypeLabel htmlFor="제목">제목</ContentTypeLabel>
        </li>
        <li>
          <ContentTypeInput
            type="radio"
            name="contentType"
            id="글쓴이"
            onClick={isContentList}
            onChange={() => {
              setContentType('Author');
            }}
          />
          <ContentTypeLabel htmlFor="글쓴이">글쓴이</ContentTypeLabel>
        </li>
        <li>
          <ContentTypeInput
            type="radio"
            name="contentType"
            id="카테고리"
            onClick={isContentList}
            onChange={() => {
              setContentType('');
            }}
          />
          <ContentTypeLabel htmlFor="카테고리">카테고리</ContentTypeLabel>
        </li>
      </ul>
    </ContentTypeListWrap>
  );
};
export default ContentTypeList;

const ContentTypeListWrap = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1.5px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  bottom: -166px;
  z-index: 99;
`;
const ContentTypeInput = styled.input`
  display: none;
`;
const ContentTypeLabel = styled.label`
  display: block;
  padding: 10px 20px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.header02};
  color: ${(props) => props.theme.colors.grey1};
  background-color: ${(props) => props.theme.colors.white};
  :hover {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.header02};
    color: ${(props) => props.theme.colors.secondary1};
    background-color: rgba(255, 203, 124, 0.4);
  }
`;
