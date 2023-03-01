import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { showContentTypeState } from '../../../../recoil/search';
// 컴포넌트
import ContentTypeList from './ContentTypeList';
import ContentTypeSelect from './ContentTypeSelect';
const ContentType = () => {
  const showContentList = useRecoilValue(showContentTypeState);
  return (
    <SearchContainer>
      <ContentTypeSelect />
      {showContentList && <ContentTypeList />}
    </SearchContainer>
  );
};

export default ContentType;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-right: 1.5px solid ${(props) => props.theme.colors.primary};
`;
