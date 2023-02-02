import React from 'react';
import styled from 'styled-components';
import { useMatch, useNavigate } from 'react-router-dom';

import search from '../../assets/icons/search-yl-20.png';
import close from '../../assets/icons/common_close_bk_24.png';
import { useRecoilValue } from 'recoil';
import { notificationShowState } from '../../recoil/notification';

const Search = () => {
  const showSearchTip = useRecoilValue(notificationShowState);
  const navigate = useNavigate();
  const match = useMatch('/search');
  const onClickClose = () => {
    navigate(-1);
  };
  const onClickSearch = () => {
    navigate('/search');
  };
  return (
    <div>
      {match ? (
        <Close onClick={onClickClose}>
          <img src={close} alt="닫기아이콘" />
        </Close>
      ) : (
        <SearchCintainer>
          <SearchWrap onClick={onClickSearch}>
            <img src={search} alt="검색" />
          </SearchWrap>
          {!showSearchTip && (
            <SearchTipWrap>
              <Triangle>
                <div />
              </Triangle>
              <SearchTip>빠르게 찾아보세요</SearchTip>
            </SearchTipWrap>
          )}
        </SearchCintainer>
      )}
    </div>
  );
};

export default Search;

const SearchCintainer = styled.div`
  position: relative;
`;
const SearchWrap = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 24px;
  }
`;

const SearchTipWrap = styled.div`
  position: absolute;
  height: 48px;
  bottom: -48px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Triangle = styled.div`
  > div {
    width: 0;
    height: 0;
    border-bottom: 14px solid ${(props) => props.theme.colors.primary};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
  width: 14px;
  height: 14px;
`;
const SearchTip = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.badge01};
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primary};
  padding: 6px 14px;
  border-radius: 40px;
  width: 122px;
  height: 34px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Close = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 24px;
    @media screen and (max-width: 768px) {
      width: 18px;
    }
  }
`;
