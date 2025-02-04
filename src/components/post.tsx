import { styled } from "styled-components";
import { IPost } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`
const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`
const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`

export default function Post({ username, photo, post, userId, id }: IPost) {
  const user = auth.currentUser
  const onDelete = async () => {
    const ok = confirm("削除しますか？")
    if (!ok || user?.uid !== userId) return
    try {
      await deleteDoc(doc(db, "posts", id))
      if (photo) {
        const photoRef = ref(storage, `posts/${user.uid}/${id}`)
        await deleteObject(photoRef)
      }
    } catch (e) {
      console.log(e)
    } finally {

    }
  }
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{post}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>削除</DeleteButton>
        ) : null}
      </Column>
      <Column>{photo ? (<Photo src={photo} />) : null}</Column>
    </Wrapper>
  )
}
