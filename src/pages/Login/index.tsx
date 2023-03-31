import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { useAuthContext } from './../../context/useAuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { appFireStore, auth } from '../../firebase/config';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';

import Modal from '../../components/Modal';
import { ModalPortal } from '../../components/Modal';
import showLoginModal from '../../recoil/showLoginModal';

import kakaoIcon from '../../assets/icons/kakaoIcon.png';
import googleIcon from '../../assets/icons//googleIcon.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch }: any = useAuthContext();
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = 'http://localhost:3000/login/kakao/oauth';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const KakaoRedirectHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const setShowLoginModal = useSetRecoilState(showLoginModal);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (data: any) => {
        await dispatch({ type: 'login', payload: data.user });
        const { uid, displayName, photoURL } = data.user;
        const collectionRef = collection(appFireStore, 'userInfo');
        const documentRef = doc(collectionRef, uid); // 문서 이름을 uid로 지정
        const newData = { displayName, photoURL } as any;
        await setDoc(documentRef, newData); // setDoc() 함수를 사용하여 문서를 설정
        setShowLoginModal(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHideLoginModal = () => {
    setShowLoginModal(false);
  };
  return (
    <ModalPortal>
      <LoginModal className="LoginModal" onClick={onHideLoginModal}>
        <h2>환영합니다!</h2>
        <span>회원이 되면 모든 서비스를 이용하실 수 있습니다.</span>
        <KakaoLoginButton className="kakaoLogin" type="button">
          <img src={kakaoIcon} />
          카카오로 시작하기
        </KakaoLoginButton>
        <GoggleLoginButton onClick={handleGoogleLogin}>
          <img src={googleIcon} />
          구글로 시작하기
        </GoggleLoginButton>
        <CloseModal onClick={onHideLoginModal}>다음에 할래요</CloseModal>
      </LoginModal>
    </ModalPortal>
  );
};

export default Login;

const LoginModal = styled(Modal)`
  text-align: center;
  h2 {
    font-size: 1.8rem;
    line-height: 2.5rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-bottom: 12px;
  }
  span {
    font-size: ${(props) => props.theme.fontSize.body02};
    line-height: ${(props) => props.theme.lh20};
    font-weight: ${(props) => props.theme.fontWeight.regular};
  }
`;

const Button = styled.button`
  display: block;
  width: 320px;
  padding: 19px 24px;
  margin: 0px 0 12px;
  border-radius: 8px;
  font-family: inherit;
  font-size: ${(props) => props.theme.fontSize.body01};
  line-height: ${(props) => props.theme.lh22};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  img {
    float: left;
  }
`;
const KakaoLoginButton = styled(Button)`
  background-color: #fee500;
  margin-top: 120px;
`;

const GoggleLoginButton = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.grey3};
  color: ${(props) => props.theme.colors.grey1};
  margin-bottom: 80px;
`;
const CloseModal = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.colors.grey1};
  font-size: ${(props) => props.theme.fontSize.body02};
  line-height: ${(props) => props.theme.lh20};
  font-weight: ${(props) => props.theme.fontWeight.regular};
`;
