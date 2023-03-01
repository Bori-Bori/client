import { atom } from 'recoil';

const showLoginModal = atom({
  key: 'showLoginModal',
  default: false,
});

export default showLoginModal;
