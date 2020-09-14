import { graphql, useStaticQuery } from "gatsby"
import GatsbyImage, { FluidObject } from "gatsby-image"
import React from "react"
import { ImageQuery } from "../../graphql-types"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image: React.FC = () => {
  const data = useStaticQuery<ImageQuery>(graphql`
    query Image {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const imageFluid = data?.placeholderImage?.childImageSharp?.fluid || null
  /**
   * The `as FluidObject` is not ideal.
   * The typings for GatsbyImage do not match the
   * typings generated for GatsbyImageSharpFluid
   * Fields can be null from the query but are required for GatsbyImage
   * See if PR https://github.com/gatsbyjs/gatsby/pull/17065 has been merged
   */
  return imageFluid != null ? (
    <GatsbyImage fluid={imageFluid as FluidObject} />
  ) : null
}
export default Image
