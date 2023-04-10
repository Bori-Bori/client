import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import commentIcon from '../../../../assets/icons/comment-wh-24.png';
import userIcon from '../../../../assets/icons/user-wh-24.png';
import bookmarkIcon from '../../../../assets/icons/common-bookmark-default-24.png';
import commentGreyIcon from '../../../../assets/icons/common_comment_gr_24.png';
import userGreyIcon from '../../../../assets/icons/common_user_gr_24.png';

import bookPageAtom from '../../../../recoil/bookPage';
import bookImageAtom from '../../../../recoil/bookImage';

import CommonButton from '../../../../components/CommonButton';
import { getComments } from '../../../../apis/comment';
import { getBookInfo } from 'apis/book';

type MoreIntro = {
  moreIntro: boolean;
};

const BookInfo = () => {
  const setBookPage = useSetRecoilState(bookPageAtom);
  const setBookImage = useSetRecoilState(bookImageAtom);

  const param = useParams();
  const isbn = param.id!;
  const contentType = '';

  const { data } = useQuery(['bookinfo', isbn], async () => await getBookInfo(1, contentType, isbn));

  const { title, author, categoryName, pubDate, description, publisher, cover } = data?.[0] || {};
  const bookTotalPage = data?.[0]?.subInfo?.itemPage;
  const category1 = categoryName?.split('>')[0];
  const category2 = categoryName?.split('>')[1];
  const category3 = categoryName?.split('>')[2];
  const [moreIntro, setMoreIntro] = useState(false);
  const eidtPubDate = pubDate?.replaceAll('-', '.');

  useEffect(() => {
    if (bookTotalPage) {
      setBookPage(bookTotalPage);
    }
    if (cover) {
      setBookImage(cover);
    }
  }, [bookTotalPage, cover]);

  const toggleIntro = () => {
    setMoreIntro(!moreIntro);
  };

  const { data: commentList } = useQuery(['commentList', isbn], async () => await getComments(isbn));

  const uniqueUids = new Set(
    commentList?.initialComments.concat(commentList.nextComments).map((comment: any) => comment.uid),
  );
  const numUniqueUids = uniqueUids.size;
  const totalCommentCount = commentList?.initialComments.length + commentList?.nextComments.length;
  return (
    <BookInfoWrapper>
      <BookInfoContainer>
        <BookImgWrap>{cover ? <BookImg src={cover} alt={title} /> : <LoadingImg />}</BookImgWrap>

        <BookInfoContent>
          <FlexBetweenWrap>
            <BookTitle>{title}</BookTitle>
            <BookInfoCountsRow>
              <BookInfoNumber>
                <img src={commentGreyIcon} />
                {totalCommentCount}
              </BookInfoNumber>
              <BookInfoNumber>
                <img src={userGreyIcon} />
                {numUniqueUids}
              </BookInfoNumber>
            </BookInfoCountsRow>
          </FlexBetweenWrap>
          <FlexWrap>
            {category1 && <BookCategory>#{category1}</BookCategory>}
            {category2 && <BookCategory>#{category2}</BookCategory>}
            {category3 && <BookCategory>#{category3}</BookCategory>}
          </FlexWrap>
          <BookInfoRow2>
            {author && <Author>{author}</Author>}
            {publisher && <Publisher>{publisher} </Publisher>}
            {eidtPubDate && <EidtPubDate>{eidtPubDate} </EidtPubDate>}
          </BookInfoRow2>
          <BookInfoRow3>
            <span>
              <img src={commentIcon} alt="댓글 개수" />
              {totalCommentCount}
            </span>
            <span>
              <img src={userIcon} alt="댓글 쓴 사람" /> {numUniqueUids}
            </span>
            <span>
              <img src={bookmarkIcon} alt="북마크" />
            </span>
          </BookInfoRow3>
        </BookInfoContent>
      </BookInfoContainer>
      <BookIntro moreIntro={moreIntro} dangerouslySetInnerHTML={{ __html: description }} />
      <ToggleIntroButton className="moreIntroButton" onClick={toggleIntro}>
        {moreIntro ? '숨기기' : '더보기'}{' '}
      </ToggleIntroButton>
    </BookInfoWrapper>
  );
};

export default BookInfo;

const BookInfoWrapper = styled.section`
  padding: 0 20px 40px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey4};
`;

const BookInfoContainer = styled.div`
  display: flex;
  ${(props) => props.theme.media.tablet`
    flex-direction: column;
  `}
`;

const BookImgWrap = styled.div`
  width: 266px;
  height: 396px;
  margin-right: 40px;
  border-radius: 8px;
  overflow: hidden;
  filter: drop-shadow(0px 12px 30px rgba(0, 0, 0, 0.3));
  ${(props) => props.theme.media.tablet`
      width: 216px;
      height: 320px;
      margin: 0 auto;
    `}
`;
const BookImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const LoadingImg = styled.div`
  width: 266px;
  height: 396px;
  background-color: ${(props) => props.theme.colors.grey1};
  border-radius: 8px;
`;

const BookInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 40px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  ${(props) => props.theme.media.tablet`
      margin-top: 28px;
  `}
`;

const BookTitle = styled.h2`
  display: block;
  font-size: 2.25rem;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: 2.9rem;
  margin-bottom: 8px;
  ${(props) => props.theme.media.tablet`
      margin-bottom: 0px;
      color: ${props.theme.colors.black};
      font-size: ${props.theme.fontSize.header01};
      line-height: ${props.theme.lineHeight.lh26};
  `}
`;
const BookCategory = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSize.header02};
  line-height: ${(props) => props.theme.lineHeight.lh24};
  margin-right: 10px;
  ${(props) => props.theme.media.tablet`
      color: ${props.theme.colors.secondary1};
      font-size: ${props.theme.fontSize.body02};
      line-height: ${props.theme.lineHeight.lh20}l;
      margin-right: 5px;
      transform: translateY(30px);
  `}
`;
const BookInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexWrap = styled.div`
  ${(props) => props.theme.media.tablet`
    display: flex;
    align-items:center;
`}
`;
const FlexBetweenWrap = styled(FlexWrap)`
  justify-content: space-between;
`;
const BookInfoCountsRow = styled.div`
  display: none;
  ${(props) => props.theme.media.tablet`
    display: flex;
    align-items: center;
  `}
`;
const BookInfoNumber = styled.span`
  margin-left: 12px;

  ${(props) => props.theme.media.tablet`
    display: flex;
    align-items: center;
    color: ${props.theme.colors.grey1};
    font-size: ${props.theme.fontSize.body01};
    line-height: ${props.theme.lineHeight.lh20}l;
    > img {
      margin-right: 5px;
    }
  `}
`;

const EidtPubDate = styled.span`
  ${(props) => props.theme.media.tablet`
  display: none;
  `}
`;
const Publisher = styled.span`
  ${(props) => props.theme.media.tablet`
  display: none;
  `}
`;
const Author = styled.h3`
  display: block;
  font-size: 1.63rem;
  line-height: 2.25rem;
  margin-bottom: 8px;
  ${(props) => props.theme.media.tablet`
    color: ${props.theme.colors.grey1};
    font-size: ${props.theme.fontSize.body02};
    transform: translateY(-30px);
  `}
`;
const BookInfoRow2 = styled.div`
  margin-bottom: 42px;

  ${(props) => props.theme.media.tablet`
    height: 0px;
    margin-bottom: 0px;
  `}
`;
const BookInfoRow3 = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-size: ${(props) => props.theme.fontSize.header02};
    line-height: ${(props) => props.theme.lineHeight.lh24};
    margin-right: 12px;
    display: flex;
    align-items: center;
  }
  img {
    height: 24px;
    margin-right: 5px;
  }
  ${(props) => props.theme.media.tablet`
    display: none;
  `}
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
  ${(props) => props.theme.media.tablet`
    padding-top: 0;
    margin-top: 70px;
    ${
      props.moreIntro
        ? null
        : `
        height: 77px;
    `
    }
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
  ${(props) => props.theme.media.tablet`
    font-size: ${props.theme.fontSize.body02};
    padding: 8px 14px;
  `}
`;
