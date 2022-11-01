import { bookType } from '../../../types/book';
import book01 from '../../../assets/slide/book01.png';
import book02 from '../../../assets/slide/book02.png';
import book03 from '../../../assets/slide/book03.png';
import book04 from '../../../assets/slide/book04.png';
import book05 from '../../../assets/slide/book05.png';
import book06 from '../../../assets/slide/book06.png';
import book07 from '../../../assets/slide/book07.png';
import book08 from '../../../assets/slide/book08.png';
import book09 from '../../../assets/slide/book09.png';
import book10 from '../../../assets/slide/book10.png';

export const bookData: bookType = [
  { id: 0, TITLE: '이토록 평범한 미래', AUTHOR: '김연수', KDC: '단편소설', SUBJECT: '국내', TITLE_URL: `${book01}` },
  {
    id: 1,
    TITLE: '꿀딴지곰의 레트로 게임 대백과',
    AUTHOR: '꿀딴지곰',
    KDC: '건강/취미',
    SUBJECT: '국내',
    TITLE_URL: `${book02}`,
  },
  {
    id: 2,
    TITLE: '물고기는 존재하지 않는다',
    AUTHOR: '룰루 밀러',
    KDC: '과학',
    SUBJECT: '국내',
    TITLE_URL: `${book03}`,
  },
  {
    id: 3,
    TITLE: '불편한 편의점 2 (단풍 에디션)',
    AUTHOR: '김호연',
    KDC: '한국소설',
    SUBJECT: '국내',
    TITLE_URL: `${book04}`,
  },
  {
    id: 4,
    TITLE: '셜록 홈스 이스케이프 룸 퍼즐 ',
    AUTHOR: '제임스 해머모턴',
    KDC: '건강/취미',
    SUBJECT: '국내',
    TITLE_URL: `${book05}`,
  },
  { id: 5, TITLE: '아버지의 해방일지', AUTHOR: '정지아', KDC: '한국소설', SUBJECT: '국내', TITLE_URL: `${book06}` },
  { id: 6, TITLE: '인생의 역사', AUTHOR: '신형철', KDC: '한국에세이', SUBJECT: '국내', TITLE_URL: `${book07}` },
  {
    id: 7,
    TITLE: '총살된 프랑스, 남겨진 편지',
    AUTHOR: '이용우',
    KDC: '프랑스사',
    SUBJECT: '국내',
    TITLE_URL: `${book08}`,
  },
  {
    id: 8,
    TITLE: 'TOKEVI 도깨비 2022.창간호',
    AUTHOR: 'TOKEVI 편집부',
    KDC: '잡지',
    SUBJECT: '국내',
    TITLE_URL: `${book09}`,
  },
  {
    id: 9,
    TITLE: '2023 트렌드 노트',
    AUTHOR: '이원희,박현영,최재연,정석환,신수정,신예은,심우연',
    KDC: '트렌드/미래전망',
    SUBJECT: '국내',
    TITLE_URL: `${book10}`,
  },
];
