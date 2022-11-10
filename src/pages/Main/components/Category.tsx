import React, { useState } from 'react';
import styled from 'styled-components';
import comment from '../../../assets/icons/comment-gr-16.png';
import user from '../../../assets/icons/user-gr-16.png';
import { categoryData } from './categoryBookList';

import bookmark_default from '../../../assets/icons/bookmark-default-24.png';
import bookmark_select from '../../../assets/icons/bookmark-select-24.png';

const Category = () => {
  const [mainselect, setMainselect] = useState('국내');
  const [middleselect, setMiddleselect] = useState('전체');
  const [subselect, setSubelect] = useState('🔍 추리,범죄');
  const [bookMark, setBookMark] = useState(false);

  const mainClickBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainselect(e.target.id);
  };
  const middleClickBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMiddleselect(e.target.id);
  };
  const subClickBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubelect(e.target.id);
  };

  return (
    <Container>
      <MainSelect>
        <li>
          <MainInput type="radio" name="mainselect" id="국내" defaultChecked onChange={mainClickBtn} />
          <MainLabel htmlFor="국내">국내</MainLabel>
        </li>
        <li>
          <Line />
        </li>
        <li>
          <MainInput type="radio" name="mainselect" id="외국" onChange={mainClickBtn} />
          <MainLabel htmlFor="외국">외국</MainLabel>
        </li>
      </MainSelect>
      {mainselect === '국내' && (
        <MiddleSelect>
          <li>
            <MiddleInput type="radio" name="middleselect" id="전체" defaultChecked onChange={middleClickBtn} />
            <MiddleLabel htmlFor="전체">전체</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="소설" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="소설">소설</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="경제,경영" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="경제,경영">경제,경영</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="인문학" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="인문학">인문학</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="청소년" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="청소년">청소년</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="어린이" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="어린이">어린이</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="여행" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="여행">여행</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="요리,살림" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="요리,살림">요리,살림</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="건강,취미" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="건강,취미">건강,취미</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="사회과학" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="사회과학">사회과학</MiddleLabel>
          </li>
          <li>
            <MiddleInput type="radio" name="middleselect" id="예술" onChange={middleClickBtn} />
            <MiddleLabel htmlFor="예술">예술</MiddleLabel>
          </li>
        </MiddleSelect>
      )}
      {middleselect === '전체' && (
        <>
          <SubSelect>
            <li>
              <SubInput type="radio" name="subselect" id="🔍 추리,범죄" defaultChecked onChange={subClickBtn} />
              <SubLabel htmlFor="🔍 추리,범죄">🔍 추리,범죄</SubLabel>
            </li>
            <li>
              <SubInput type="radio" name="subselect" id="💓 로맨스" onChange={subClickBtn} />
              <SubLabel htmlFor="💓 로맨스">💓 로맨스</SubLabel>
            </li>
            <li>
              <SubInput type="radio" name="subselect" id="🥋 판타지,무협" onChange={subClickBtn} />
              <SubLabel htmlFor="🥋 판타지,무협">🥋 판타지,무협</SubLabel>
            </li>
            <li>
              <SubInput type="radio" name="subselect" id="🤖 만화,코믹" onChange={subClickBtn} />
              <SubLabel htmlFor="🤖 만화,코믹">🤖 만화,코믹</SubLabel>
            </li>
            <li>
              <SubInput type="radio" name="subselect" id="📺 고전" onChange={subClickBtn} />
              <SubLabel htmlFor="📺 고전">📺 고전</SubLabel>
            </li>
          </SubSelect>
          {subselect === '🔍 추리,범죄' && (
            <CategoryWrap>
              {categoryData.map((value) => {
                return (
                  <li key={value?.TITLE}>
                    <div>
                      <BookImgWrap>
                        <BookImg src={value?.TITLE_URL} alt={value?.TITLE} />
                        <BookBg>
                          <BookmarkBtn
                            onClick={() => {
                              setBookMark(!bookMark);
                            }}
                          >
                            <img src={bookMark ? bookmark_select : bookmark_default} alt="북마크" />
                          </BookmarkBtn>
                        </BookBg>
                      </BookImgWrap>
                      <BookWrap>
                        <BookTitle>{value?.TITLE}</BookTitle>
                        <BookAuthor>{value?.AUTHOR}</BookAuthor>
                        <BookContent>
                          <li>
                            <img src={comment} alt="댓글아이콘" />
                            <span> 12</span>
                          </li>
                          <li>
                            <img src={user} alt="유저아이콘" />
                            <span> 3</span>
                          </li>
                        </BookContent>
                      </BookWrap>
                    </div>
                  </li>
                );
              })}
            </CategoryWrap>
          )}
        </>
      )}
    </Container>
  );
};

export default Category;
const Container = styled.section`
  max-width: 1024px;
  min-width: 360px;
  margin: 0 auto;
  padding: 128px 24px;
`;

const MainSelect = styled.ul`
  display: flex;
  gap: 16px;
`;

const Line = styled.div`
  width: 1px;
  height: 18px;
  background-color: ${(props) => props.theme.colors.grey1};
`;
const MiddleSelect = styled.ul`
  display: flex;
  gap: 20px;
  margin-left: 4px;
  padding: 16px 0;
`;
const MainInput = styled.input`
  display: none;
  :checked + label {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.header01};
    color: ${(props) => props.theme.colors.black};
  }
`;
const MainLabel = styled.label`
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.light};
  font-size: ${(props) => props.theme.fontSize.header01};
  color: ${(props) => props.theme.colors.grey1};
`;

const MiddleInput = styled.input`
  display: none;
  :checked + label {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.body01};
    color: ${(props) => props.theme.colors.black};
  }
`;
const MiddleLabel = styled.label`
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.light};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
`;
const SubSelect = styled.ul`
  display: flex;
  gap: 12px;
  margin-left: 4px;
`;
const SubInput = styled.input`
  display: none;
  :checked + label {
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSize.body02};
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
const SubLabel = styled.label`
  display: block;
  border-radius: 20px;
  padding: 12px 8px;
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
  background-color: rgba(255, 203, 124, 0.3); ;
`;
const CategoryWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const BookBg = styled.div`
  display: none;
  padding: 14px 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 80px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
`;
const BookImgWrap = styled.div`
  width: 176px;
  height: 260px;
  margin-bottom: 14px;
  filter: drop-shadow(0px 12px 30px rgba(0, 0, 0, 0.3));
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  :hover ${BookBg} {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const BookmarkBtn = styled.button``;

const BookImg = styled.img`
  width: 100%;
`;
const BookWrap = styled.div`
  width: 176px;
`;
const BookTitle = styled.h3`
  line-height: 22px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.body01};
  color: ${(props) => props.theme.colors.black};
`;
const BookAuthor = styled.p`
  line-height: 22px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
  margin-top: 2px;
  margin-bottom: 15px;
`;
const BookContent = styled.ul`
  display: flex;
  gap: 19px;
  align-items: center;
  li {
    display: flex;
    align-items: center;
    gap: 7.69px;
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSize.body02};
    color: ${(props) => props.theme.colors.grey1};
  }
`;
