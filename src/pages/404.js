import React from "react"
import { graphql } from "gatsby"
import { Container, Content, Post, SEO } from "../components"
import { H1, P } from "../components/Typography"
import Img from "gatsby-image"

const notFound = ({ data }) => {
  return (
    <Container>
      <SEO />
      <Content>
        <Post>
          <H1 lineHeight="1.1em" fontSize="1.3rem">
            Sorry. Could not find that resource
          </H1>
          <P margin="1em 0 1em 0" lineHeight="1.1em" fontSize="1.06em">
            "404Not Found".
          </P>
          <Img
            fluid={data.imageSharp.fluid}
            draggable={false}
            alt="Not Found"
            title="Not Found"
          ></Img>
        </Post>
      </Content>
    </Container>
  )
}
export default notFound

export const notFoundQuery = graphql`
  query {
    imageSharp(fluid: { originalName: { eq: "not-found.png" } }) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
