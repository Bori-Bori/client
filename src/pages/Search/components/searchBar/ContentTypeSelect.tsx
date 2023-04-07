import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentTypeState, showContentTypeState } from '../../../../recoil/search';
import toggle from '../../../../assets/icons/common_down_gr_20.png';

const ContentTypeSelect = () => {
  const contentType = useRecoilValue(contentTypeState);
  const [showContentList, setShowContentList] = useRecoilState(showContentTypeState);

  function contentTypeSelect() {
    if (contentType === 'Keyword') {
      return '제목+글쓴이';
    }
    if (contentType === 'Title') {
      return '제목';
    }
    if (contentType === 'Author') {
      return '글쓴이';
    }
    if (contentType === '') {
      return '카테고리';
    }
    return;
  }

  return (
    <ContentTypeSelectContainer
      onClick={() => {
        setShowContentList(!showContentList);
      }}
    >
      <p>{contentTypeSelect()}</p>
      <img src={toggle} alt="토글아이콘" />
    </ContentTypeSelectContainer>
  );
};

export default ContentTypeSelect;

const ContentTypeSelectContainer = styled.button`
  display: flex;
  gap: 6px;
  align-items: center;
  text-align: left;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.header02};
  color: ${(props) => props.theme.colors.grey1};
  margin-right: 20px;
  @media screen and (max-width: 768px) {
    margin-right: 8px;
  }
  p {
    width: 101px;
  }
`;
