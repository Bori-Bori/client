import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { bookData } from '../bookData';
import { useRecoilValue } from 'recoil';
import { countState } from '../../../../recoil/slide';

// 이미지
import bookmark_default from '../../../../assets/icons/bookmark-default-24-bg.png';
import bookmark_select from '../../../../assets/icons/bookmark-select-24-bg.png';
import comment from '../../../../assets/icons/common_comment_gr_24.png';
import user from '../../../../assets/icons/common_user_gr_24.png';

const Tablet = () => {
  const [bookMark, setBookMark] = useState(false);
  const [lastCount, setLastCount] = useState(9);
  const count = useRecoilValue(countState);

  // 왼쪽 이미지가 책목록중 마지막 책[9]부터 시작해서 인덱스가 1, 2, ...로 증가합니다.
  useEffect(() => {
    const id = setInterval(() => {
      setLastCount(count - 1);
      setLastCount((lastCount) => lastCount + 1);
      if (count === 0) {
        clearInterval(id);
        setLastCount(8);
      }
    }, 2000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <ResponsiveWrap>
      <LeftImg key={bookData[lastCount]?.id}>
        <img src={bookData[lastCount]?.TITLE_URL} alt={bookData[lastCount]?.TITLE} />
      </LeftImg>
      <li key={bookData[count]?.id}>
        <CenterBook>
          <CenterBookWrap>
            <CenterBookImg>
              <BookImg src={bookData[count]?.TITLE_URL} alt="도서이미지" />
            </CenterBookImg>
            <BookTextWrap>
              <div>
                <Title>🔥 이번주 HOT 도서</Title>
                <BookTitleWrap>
                  <BookNumber>{count + 1}</BookNumber>
                  <BookTitle>{bookData[count]?.TITLE}</BookTitle>
                </BookTitleWrap>
                <BookAuthor>{bookData[count]?.AUTHOR}</BookAuthor>
                <Subject>
                  <span>#{bookData[count]?.SUBJECT}</span>
                  <span>#{bookData[count]?.KDC}</span>
                </Subject>
                <BookContent>
                  <li>
                    <img src={comment} alt="댓글아이콘" />
                    <span> 12</span>
                  </li>
                  <li>
                    <img src={user} alt="유저아이콘" />
                    <span> 3</span>
                  </li>
                  <li>
                    <BookmarkBtn
                      onClick={() => {
                        setBookMark(!bookMark);
                      }}
                    >
                      <img src={bookMark ? bookmark_select : bookmark_default} alt="찜" />
                    </BookmarkBtn>
                  </li>
                </BookContent>
              </div>
            </BookTextWrap>
          </CenterBookWrap>
        </CenterBook>
      </li>
      <RightImg key={bookData[count + 1]?.id}>
        <img src={bookData[count + 1]?.TITLE_URL} alt={bookData[count + 1]?.TITLE} />
      </RightImg>
    </ResponsiveWrap>
  );
};

export default Tablet;

const ResponsiveWrap = styled.ul`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const LeftImg = styled.div`
  width: 10%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 768px) {
    width: 25.5%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 13%;
  }
  img {
    width: 100%;
  }
`;
const RightImg = styled.div`
  width: 10%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  @media screen and (max-width: 768px) {
    width: 25.5%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 13%;
  }
  img {
    width: 100%;
  }
`;

const CenterBook = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 68%;
  height: 100%;
`;
const CenterBookWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const CenterBookImg = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20%;
  filter: drop-shadow(-30px 30px 30px rgba(74, 45, 0, 0.24));
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 34%;
  }
  @media screen and (max-width: 768px) {
    width: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes opacityChange {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes leftmove {
    0% {
    }
    100% {
      width: 15%;
      left: -20%;
      top: 50%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 768px) {
        width: 25.5%;
      }
      @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 13%;
      }
    }
  }
  animation: opacityChange 1s linear, leftmove 1s linear;
  animation-delay: 1s;
`;
const BookTextWrap = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
  width: 40%;
`;
const Title = styled.h1`
  margin-bottom: 1.25rem;
  color: ${(props) => props.theme.colors.secondary1};
  font-size: ${(props) => props.theme.fontSize.header01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;
const BookTitleWrap = styled.div``;

const BookNumber = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 3.75rem;
  color: ${(props) => props.theme.colors.primary};
`;
const BookTitle = styled.p`
  margin-top: -2rem;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.black};
  line-height: 2.375rem;
`;
const Subject = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.badge01};
  display: flex;
  gap: 0.5rem;
  span {
    color: ${(props) => props.theme.colors.secondary1};
  }
`;

const BookAuthor = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body01};
  color: ${(props) => props.theme.colors.grey1};
`;

const BookContent = styled.ul`
  li {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSize.body01};
    color: ${(props) => props.theme.colors.grey1};
  }
  display: flex;
  align-items: center;
  gap: 19px;
  margin-top: 12px;
`;
const BookImg = styled.img`
  width: 100%;
`;

const BookmarkBtn = styled.button``;
