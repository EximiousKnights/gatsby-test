import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const query = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        url
        image
        author
      }
    }
  }
`

export const SEO = ({
  description,
  lang = `en`,
  keywords,
  title,
  image,
  url,
  author,
}) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaTitle = title || data.site.siteMetadata.title
        const metaAuthor = author || data.site.siteMetadata.author
        const metaUrl = url || data.site.siteMetadata.url
        // const metaImage = image || data.site.siteMetadata.image
        const metaKeywords = keywords || [
          "Bruce Wayne",
          "Bruce Wayne Website",
          "Bruce Wayne Blog",
          "Bruce",
          "Bruce Blog",
          "Bruce Website",
          "Bruce Wayne USA",
          "Bruce Gatsby",
        ]
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={data.site.siteMetadata.title}
            titleTemplate={`%s`}
            defer={false}
            meta={[
              {
                name: `title`,
                content: metaTitle,
              },
              {
                name: `author`,
                content: metaAuthor,
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `url`,
                content: metaUrl,
              },
              {
                property: `og:title`,
                content: metaTitle,
              },
              {
                property: `og:author`,
                content: metaAuthor,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `blog`,
              },
              {
                property: `og:url`,
                content: metaUrl,
              },
            ].concat(
              metaKeywords && metaKeywords.length > 0
                ? {
                    name: `keywords`,
                    content: metaKeywords.join(`, `),
                  }
                : []
            )}
          />
        )
      }}
    />
  )
}
