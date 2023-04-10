import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import commentIcon from '../../../../assets/icons/comment-wh-24.png';
import userIcon from '../../../../assets/icons/user-wh-24.png';
import bookmarkIcon from '../../../../assets/icons/common-bookmark-default-24.png';
import commentGreyIcon from '../../../../assets/icons/common_comment_gr_12.png';
import userGreyIcon from '../../../../assets/icons/common_user_gr_16.png';

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
        {cover ? <img src={cover} alt={title} /> : <LoadingImg />}
        <BookInfoContent>
          <BookInfoRow1>
            <h2>{title}</h2>
            <BookInfoCountsRow>
              <span>
                <img src={commentGreyIcon} />
                12
              </span>
              <span>
                <img src={userGreyIcon} />
                12
              </span>
            </BookInfoCountsRow>
            {category1 && <span>#{category1} </span>}
            {category2 && <span>#{category2} </span>}
            {category3 && <span>#{category3} </span>}
          </BookInfoRow1>
          <BookInfoRow2>
            {author && <h3>{author}</h3>}
            {publisher && <span>/{publisher} </span>}
            {eidtPubDate && <span>{eidtPubDate} </span>}
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
  /* width: 100vw; */
  ${(props) => props.theme.media.tablet`
    // width: 100vw;
    flex-direction: column;
  `}
  & > img {
    position: relative;
    top: 10px;
    width: 266px;
    height: 396px;
    margin-right: 40px;
    border-radius: 8px;
    filter: drop-shadow(0px 12px 30px rgba(0, 0, 0, 0.3));
    ${(props) => props.theme.media.tablet`
      width: 216px;
      height: 320px;
      margin: 0 auto;
      top: 20px;
    
    `}
  }
`;

const LoadingImg = styled.div`
  width: 266px;
  height: 396px;
  background-color: ${(props) => props.theme.colors.grey1};
  border-radius: 8px;
`;

const BookInfoContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  ${(props) => props.theme.media.tablet`
    top: 30px;
  `}
`;

const BookInfoRow1 = styled.div`
  margin-bottom: 30px;
  h2 {
    display: block;
    width: 65%;
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

  ${(props) => props.theme.media.tablet`
  margin-bottom: 0px;
    color: ${props.theme.colors.black};
    & > h2 {
      font-size: ${props.theme.fontSize.header01};
      margin-top: 28px;
      line-height: ${props.theme.lineHeight.lh26};
    }
    & > span {
      position: relative;
      top: 39px;
      color: ${props.theme.colors.secondary1};
      font-size: ${props.theme.fontSize.badge01};
      line-height: ${props.theme.lineHeight.lh20}l;
      margin-right: 5px;
    }
  `}
`;

const BookInfoCountsRow = styled.div`
  display: none;
  top: 33px;
  ${(props) => props.theme.media.tablet`
    display: block;
    position: absolute;
    right: 0;
    & > span {
      margin-left: 12px;
      color: ${props.theme.colors.grey1};
      font-size: ${props.theme.fontSize.badge01};
      line-height: ${props.theme.lineHeight.lh20}l;
      > img {
        margin-right: 3px;
      }
    }

  `}
`;

const BookInfoRow2 = styled.div`
  margin-bottom: 42px;
  h3 {
    display: block;
    font-size: 1.63rem;
    line-height: 2.25rem;
    margin-bottom: 8px;
  }
  ${(props) => props.theme.media.tablet`
  height: 0px;
  margin-bottom: 0px;
  h3{
    color: ${props.theme.colors.grey1};
    font-size: ${props.theme.fontSize.body02};
    position: relative;
    top: -25px;
  }
  span {
      display: none;
    }
  `}
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
