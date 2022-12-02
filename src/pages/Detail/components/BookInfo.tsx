import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import comment from '../../../assets/icons/comment-wh-24.png';
import user from '../../../assets/icons/user-wh-24.png';
import bookmark from '../../../assets/icons/common-bookmark-default-24.png';
import CommonButton from '../../../components/CommonButton';
import boardState from '../../../recoil/board';

type MoreIntro = {
  moreIntro: boolean;
};

type BookState = {
  title: string;
  author: string;
  pubDate: string;
  category1: string;
  category2: string;
  category3: string;
  description: string;
  publisher: string;
  imagePath: string;
};

const BookInfo = () => {
  const { title, author, pubDate, category1, category2, category3, description, publisher, imagePath }: any =
    useRecoilValue(boardState);
  const eidtPubDate = pubDate?.replaceAll('-', '.');
  const editImagePath = imagePath?.replace('coversum', 'cover500');
  const [moreIntro, setMoreIntro] = useState(false);

  const toggleIntro = () => {
    moreIntro ? setMoreIntro(false) : setMoreIntro(true);
  };
  return (
    <BookInfoWrapper>
      <BookInfoContainer>
        <img src={editImagePath} alt={title} />
        <BookInfoContent>
          <BookInfoRow1>
            <h2>{title}</h2>
            {category1 && <span>#{category1} </span>}
            {category2 && <span>#{category2} </span>}
            {category3 && <span>#{category3} </span>}
          </BookInfoRow1>
          <BookInfoRow2>
            {author && <h3>{author}</h3>}
            {publisher && <span>{publisher} </span>}
            {eidtPubDate && <span>{eidtPubDate} </span>}
          </BookInfoRow2>
          <BookInfoRow3>
            <span>
              <img src={comment} alt="댓글 개수" />
              12
            </span>
            <span>
              <img src={user} alt="댓글 쓴 사람" />3
            </span>
            <span>
              <img src={bookmark} alt="북마크" />
            </span>
          </BookInfoRow3>
        </BookInfoContent>
      </BookInfoContainer>
      <BookIntro moreIntro={moreIntro}>{description}</BookIntro>
      <ToggleIntroButton className="moreIntroButton" onClick={toggleIntro}>
        {moreIntro ? '숨기기' : '더보기'}{' '}
      </ToggleIntroButton>
    </BookInfoWrapper>
  );
};

export default BookInfo;

const BookInfoWrapper = styled.section`
  padding-bottom: 40px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey4};
`;

const BookInfoContainer = styled.div`
  display: flex;
  & > img {
    position: relative;
    top: 10px;
    width: 266px;
    height: 396px;
    margin-right: 40px;
    border-radius: 8px;
    filter: drop-shadow(0px 12px 30px rgba(0, 0, 0, 0.3));
  }
`;
const BookInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeight.regular};
`;

const BookInfoRow1 = styled.div`
  margin-bottom: 30px;
  h2 {
    display: block;
    font-size: 2.25rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    line-height: 2.9rem;
    margin-bottom: 8px;
  }
  > span {
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.fontSize.header02};
    line-height: ${(props) => props.theme.lineHeight.lh24};
  }
`;
const BookInfoRow2 = styled.div`
  margin-bottom: 42px;
  h3 {
    display: block;
    font-size: 1.63rem;
    line-height: 2.25rem;
    margin-bottom: 8px;
  }
`;
const BookInfoRow3 = styled.div`
  > span {
    font-size: ${(props) => props.theme.fontSize.header02};
    line-height: ${(props) => props.theme.lineHeight.lh24};
    margin-right: 12px;
  }
  img {
    height: 24px;
    margin-right: 3px;
    vertical-align: -4px;
    cursor: pointer;
  }
`;

const BookIntro = styled.p<MoreIntro>`
  padding-top: 80px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.body02};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  ${(props) =>
    props.moreIntro
      ? null
      : `
      height: 135px;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    
  `}
`;
const ToggleIntroButton = styled(CommonButton)`
  display: block;
  box-sizing: border-box;
  width: 112px;
  height: 44px;
  margin: 12px auto 0;
  padding: 12px 16px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.body02};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey3};
  font-family: inherit;
  border-radius: 24px;
  outline: none;
`;
