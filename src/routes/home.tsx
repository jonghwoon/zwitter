import { styled } from "styled-components"
import PostForm from "../components/post-form"
import Timeline from "../components/timeline"

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  grid-template-rows: 1fr 5fr;
`


export default function Home() {
  return (
    <Wrapper>
      <PostForm />
      <Timeline />
    </Wrapper>
  )
}
