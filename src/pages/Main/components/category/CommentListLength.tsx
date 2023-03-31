import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { appFireStore } from '../../../../firebase/config';

const CommentListLength = ({ isbn }: any) => {
  const [commentListLength, setCommentListLength] = useState();
  useEffect(() => {
    const collectionRef = collection(appFireStore, 'comments');
    const documentRef = doc(collectionRef, isbn);
    const unsubscribe = onSnapshot(documentRef, (doc) => {
      const commentList = doc.data()?.commentList?.length || 0;
      setCommentListLength(commentList);
    });

    return () => unsubscribe();
  }, [isbn]);
  return <span>{commentListLength}</span>;
};

export default CommentListLength;
