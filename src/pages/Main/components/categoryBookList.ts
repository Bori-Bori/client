import { bookType } from '../../../types/book';
import book01 from '../../../assets/category/book01.png';
import book02 from '../../../assets/category/book02.png';
import book03 from '../../../assets/category/book03.png';
import book04 from '../../../assets/category/book04.png';
import book05 from '../../../assets/category/book05.png';
import book06 from '../../../assets/category/book06.png';
import book07 from '../../../assets/category/book07.png';
import book08 from '../../../assets/category/book08.png';
import book09 from '../../../assets/category/book09.png';
import book10 from '../../../assets/category/book10.png';

export const categoryData: bookType = [
  { id: 0, TITLE: '나는 오래된 거리처럼 너를 사랑하고', AUTHOR: '진은영', TITLE_URL: `${book01}` },
  {
    id: 1,
    TITLE: '그 길로 갈바엔',
    AUTHOR: '하양지',
    TITLE_URL: `${book02}`,
  },
  {
    id: 2,
    TITLE: '부자아빠 가난한 아빠',
    AUTHOR: '로버트 기요사키',
    TITLE_URL: `${book03}`,
  },
  {
    id: 3,
    TITLE: '빠르게 실패하기',
    AUTHOR: '존 크럼볼츠, 라이언 바비노',
    TITLE_URL: `${book04}`,
  },
  { id: 4, TITLE: '책과 우연들', AUTHOR: '김초엽', TITLE_URL: `${book05}` },
  { id: 5, TITLE: '트렌드 코리아 2023', AUTHOR: '김난도, 전미영, 최지혜, 이수...', TITLE_URL: `${book06}` },
  {
    id: 6,
    TITLE: '단순한 열정',
    AUTHOR: '아니 에르노',
    TITLE_URL: `${book07}`,
  },
  {
    id: 7,
    TITLE: '세상에서 가장 쉬운 본질 육아',
    AUTHOR: '지나영',
    TITLE_URL: `${book08}`,
  },
  {
    id: 8,
    TITLE: '불편한 편의점2',
    AUTHOR: '김호연',
    TITLE_URL: `${book09}`,
  },
  {
    id: 9,
    TITLE: '파친코1',
    AUTHOR: '이민진',
    TITLE_URL: `${book10}`,
  },
];
