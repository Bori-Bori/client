import React, { useState } from 'react';
import styled from 'styled-components';
import comment from '../../../assets/icons/comment-wh-24.png';
import user from '../../../assets/icons/user-wh-24.png';
import bookmark from '../../../assets/icons/bookmark-default-24.png';

type MoreIntro = {
  moreIntro: boolean;
};

const BookInfo = () => {
  const [moreIntro, setMoreIntro] = useState(false);

  const toggleIntro = () => {
    moreIntro ? setMoreIntro(false) : setMoreIntro(true);
  };
  return (
    <BookInfoWrapper>
      <BookInfoContainer>
        <img src="http://image.yes24.com/goods/113737324/XL" />
        <BookInfoContent>
          <BookInfoRow1>
            <h2>마지막 이야기 전달자</h2>
            <span>#국내 #단편소설</span>
          </BookInfoRow1>
          <BookInfoRow2>
            <h3>도나 바르바 이게라</h3>
            <span>위즈덤 하우스 2022.10.05</span>
          </BookInfoRow2>
          <BookInfoRow3>
            <span>
              <img src={comment} />
              12
            </span>
            <span>
              <img src={user} />3
            </span>
            <span>
              <img src={bookmark} />
            </span>
          </BookInfoRow3>
        </BookInfoContent>
      </BookInfoContainer>
      <BookIntro moreIntro={moreIntro}>
        『기억 전달자』를 잇는 또 하나의 SF 명작 탄생! 지구를 기억하는 마지막 이야기 전달자의 여정 2022년은 뉴베리상이
        제정된 지 100주년이 되는 해이다. 뉴베리상은 미국의 가장 권위 있는 아동 문학상으로, 1922년부터 미국도서관협회가
        매해 가장 뛰어난 작품에 수여해 왔다. 올해 초 뉴베리 대상작으로 『마지막 이야기 전달자』가 호명되는 순간 모두가
        깜짝 놀랐다. 2021년 한국 문화에 뿌리를 둔 『호랑이를 덫에 가두면』에 이어 다시 한번 라틴 문화에 뿌리를 둔 ‘도나
        바르바 이게라’의 『마지막 이야기 전달자』에 대상을 수여한 것이다. 이 책은 미국도서관협회가 가장 뛰어난 라틴
        문학에 수여하는 ‘푸라 벨프레 대상’을 또 한 번 거머쥐며 2관왕의 영광을 누렸다. 이 책은1994년 뉴베리 대상작 『기억
        전달자』를 잇는 SF 명작이라는 점에서도 의미가 깊다. 2061년 지구와 핼리 혜성의 충돌 뒤 세이건이라는 행성에 도착한
        마지막 이야기 전달자 페트라의 여정을 통해 무엇이 우리를 인간이게 하는지를 탐구한다. 페트라는 콜렉티브가 차이가
        없는 평등한 사회를 만들겠다는 명목 아래 과거의 모든 기억을 지운 세상에서 여전히 지구를 기억하며 눈을 뜬다.
        자신이 누군인지조차 잊어버린 채 임무를 위해서만 움직이는 사람들 속에서 페트라는 사랑과 연민을 느끼는 진짜
        인간이길 포기하지 않는다. 독자들은 낯선 행성에서 자신의 이야기를 이어 나가는 ‘마지막 이야기 전달자’ 페트라의
        여정을 응원하며 세상을 구하는 놀라운 이야기의 힘에 매료될 것이다.
      </BookIntro>
      <ToggleIntroButton onClick={toggleIntro}>{moreIntro ? '책 소개 숨기기' : '책 소개 더보기'}</ToggleIntroButton>
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
    top: 60px;
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
  justify-content: end;
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
    height: 16px;
    margin-right: 3px;
    vertical-align: -4px;
  }
`;

const BookIntro = styled.p<MoreIntro>`
  padding-top: 96px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.body02};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  /* box-shadow: inset 0px 0px 35px 35px ${(props) => props.theme.colors.white}; */
  ${(props) =>
    props.moreIntro
      ? null
      : `
      height: 120px;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    
  `}
`;
const ToggleIntroButton = styled.button`
  display: block;
  width: 120px;
  margin: 12px auto 0;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.body02};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey3};
  padding: 12px 16px;
  border-radius: 24px;
  outline: none;
`;
