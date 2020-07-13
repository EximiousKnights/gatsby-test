import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { H1, Date, Tags, StyledLink } from "../components/Typography"
import { Container, Content, Post, SEO, TOC, ExternalLink } from "../components"
import kebabCase from "lodash/kebabCase"
import { MDXProvider } from "@mdx-js/react"

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      headings {
        depth
        value
      }
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
      excerpt
    }
  }
`
const singlePost = ({ data, pageContext }) => {
  const { previous, next } = pageContext

  return (
    <Container>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        author={data.mdx.frontmatter.author}
      />
      <Content>
        <Post>
          <H1>{data.mdx.frontmatter.title}</H1>
          <Date textAlign="center" fontFamily="Josefin Slab" fontSize=".85em">
            {data.mdx.frontmatter.date}&nbsp;|&nbsp;
            {data.mdx.frontmatter.tags.map(tag => (
              <span
                style={{
                  margin: "0 .2em 0 0",
                  padding: ".18em",
                  borderRadius: "10%",
                  border: "1px solid #131313",
                }}
                key={tag}
                fontSize=".8em"
              >
                <Tags to={`/tags/${kebabCase(tag)}/`}>{tag}</Tags>
              </span>
            ))}
          </Date>
          <MDXProvider components={(TOC, ExternalLink)}>
            <MDXRenderer headings={data.mdx.headings}>
              {data.mdx.body}
            </MDXRenderer>
          </MDXProvider>
          <nav>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <StyledLink to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </StyledLink>
                )}
              </li>
              <li>
                {next && (
                  <StyledLink to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </StyledLink>
                )}
              </li>
            </ul>
          </nav>
        </Post>
      </Content>
    </Container>
  )
}

export default singlePost
