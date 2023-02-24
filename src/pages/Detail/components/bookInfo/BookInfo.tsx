import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import comment from '../../../../assets/icons/comment-wh-24.png'
import user from '../../../../assets/icons/user-wh-24.png'
import bookmark from '../../../../assets/icons/common-bookmark-default-24.png';
import CommonButton from '../../../../components/CommonButton';
import { getBoard } from '../../../../apis/board';
import commentGrey from '../../../../assets/icons/common_comment_gr_12.png';
import userGrey from '../../../../assets/icons/common_user_gr_16.png';

type MoreIntro = {
  moreIntro: boolean;
};

const BookInfo = () => {
  const params = useParams();
  const isbn = params.id!;

  const { isError, data } = useQuery({
    queryKey: ['bookInfo', isbn],
    queryFn: () => getBoard(isbn),
  });

  const { title, author, pubDate, category1, category2, category3, description, publisher, imagePath }: any =
    data?.data.content || '';

  const [moreIntro, setMoreIntro] = useState(false);
  const eidtPubDate = pubDate?.replaceAll('-', '.');
  const editImagePath = imagePath?.replace('coversum', 'cover500');

  const toggleIntro = () => {
    moreIntro ? setMoreIntro(false) : setMoreIntro(true);
  };

  return (
    <BookInfoWrapper>
      <BookInfoContainer>
        {imagePath ? <img src={editImagePath} alt={title} /> : <LoadingImg />}
        <BookInfoContent>
          <BookInfoRow1>
            <h2>{title}</h2>
            <BookInfoCountsRow>
              <span>
                <img src={commentGrey} />
                12
              </span>
              <span>
                <img src={userGrey} />
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
    color: ${(props: any) => props.theme.colors.black};
    & > h2 {
      font-size: ${(props: any) => props.theme.fontSize.header01};
      margin-top: 28px;
      line-height: ${(props: any) => props.theme.lineHeight.lh26};
    }
    & > span {
      position: relative;
      top: 39px;
      color: ${(props: any) => props.theme.colors.secondary1};
      font-size: ${(props: any) => props.theme.fontSize.badge01};
      line-height: ${(props: any) => props.theme.lineHeight.lh20}l;
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
      color: ${(props: any) => props.theme.colors.grey1};
      font-size: ${(props: any) => props.theme.fontSize.badge01};
      line-height: ${(props: any) => props.theme.lineHeight.lh20}l;
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
    color: ${(props: any) => props.theme.colors.grey1};
    font-size: ${(props: any) => props.theme.fontSize.body02};
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
    ${(props: any) =>
      props.moreIntro
        ? null
        : `
        height: 77px;
    `}
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
    font-size: ${(props: any) => props.theme.fontSize.body02};
    padding: 8px 14px;
  `}
`;
