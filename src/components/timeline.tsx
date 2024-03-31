import { styled } from "styled-components"
import { useEffect, useState } from "react";
import { collection, orderBy, query, onSnapshot, limit } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./post";
import { Unsubscribe } from "firebase/auth";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll hidden;
`

export interface IPost {
  id: string
  photo?: string
  post: string
  userId: string
  username: string
  createdAt: number
}

export default function Timeline() {
  const [posts, setPost] = useState<IPost[]>([])
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchPosts = async () => {
      const postsQeury = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(25)
      )
      /* 
      const snapshot = await getDocs(postsQeury)
      const posts = snapshot.docs.map((doc) => {
        const { post, createdAt, userId, username, photo } = doc.data()
        return {
          post, createdAt, userId, username, photo, id: doc.id,
        }
      }) 
      */
      unsubscribe = await onSnapshot(postsQeury, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { post, createdAt, userId, username, photo } = doc.data()
          return {
            post, createdAt, userId, username, photo, id: doc.id,
          }
        })
        setPost(posts)
      })
    }
    fetchPosts()
    return () => {
      unsubscribe && unsubscribe();
    }
  }, [])
  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id}{...post} />
      ))}
    </Wrapper>
  )
}
