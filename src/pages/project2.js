import React, { useRef, useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import GlobalStateProvider from "../context/provider"
import ContentWrapper from "../styles/contentWrapper"
import Context from "../context/"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { seoTitleSuffix } from "../../config"

const StyledSection = styled.section`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.25rem;
  }
  h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    max-width: 56rem;
    margin: 0;
    margin-top: 55rem;
    padding: 0;
    height: 100%;
  }
`

const Project2 = ({ data }) => {
  const { body, frontmatter } = data.project2.edges[0].node
  const { title, seoTitle, useSeoTitleSuffix, useSplashScreen } = frontmatter

  const globalState = {
    isIntroDone: useSplashScreen ? false : true,
    darkMode: false,
  }

  return (
    <GlobalStateProvider initialState={globalState}>
      <Layout>
        <SEO
          title={
            useSeoTitleSuffix
              ? `${seoTitle} - ${seoTitleSuffix}`
              : `${seoTitle}`
          }
          meta={[{ name: "robots", content: "noindex" }]}
        />
        <StyledSection id={title}>
          <StyledContentWrapper>
            <video
              autoPlay
              muted
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            >
              <source src={data.webmFile.publicURL} type="video/webm" />
            </video>
            <h1 data-testid="heading" style={{ paddingTop: "3rem" }}>
                {title}
            </h1>
            <MDXRenderer>{body}</MDXRenderer>
          </StyledContentWrapper>
        </StyledSection>
      </Layout>
    </GlobalStateProvider>
  )
}

Project2.propTypes = {
  data: PropTypes.shape({
    project2: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            body: PropTypes.string.isRequired,
            frontmatter: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default Project2

export const pageQuery = graphql`
  {
    project2: allMdx(filter: { fileAbsolutePath: { regex: "/project2/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            seoTitle
            useSeoTitleSuffix
            useSplashScreen
          }
        }
      }
    }
    webmFile: file(relativePath: { eq: "project2/project2.webm" }) {
        publicURL
    }
  }
`
