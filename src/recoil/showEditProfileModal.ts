import { atom } from 'recoil';

const showEditProfileModal = atom({
  key: 'shoeEditProfileModal',
  default: false,
})

export default showEditProfileModal;