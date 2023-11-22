import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"

import GlobalStateProvider from "../context/provider"
import ContentWrapper from "../styles/contentWrapper"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { seoTitleSuffix } from "../../config"
import Underlining from "../styles/underlining"

const StyledSection = styled.section`
  width: 100%;
  max-width: 62.5rem;
  margin: 24rem 0 auto;
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
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 55rem auto 0;
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    max-width: 56rem;
    margin: 0;
    padding: 0;
    height: 100%;
  }
`

const LeftSection = styled.div`
  width: 40%;
  .tags {
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 2.5rem;
    margin-left: 1.5rem;
    line-height: 2.2rem;
    span {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
`
const RightSection = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: left;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  margin-bottom: 5rem;
  > * + * {
    margin-left: 1rem;
  }
`

const Button = styled.div`
  width: 7rem;
  height: 7rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease;
  
  &:hover {
    transform: translate3d(0px, -0.125rem, 0px);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
  }
`

const ButtonText = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const Project1 = ({ data }) => {
  const { body, frontmatter } = data.project1.edges[0].node
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
              <source src={data.webmFile.publicURL} type="video/mp4" />
            </video>
            <h1 data-testid="heading" style={{ paddingTop: "3rem" }}>
                {title}
            </h1>
            <div style={{ display: "flex" }}>
                <LeftSection>
                    <h2>My Role</h2>
                    <div className="tags">
                        <Underlining highlight> - AR Contents <br/></Underlining>
                        <Underlining highlight> - Development </Underlining>
                    </div>
                </LeftSection>
                <RightSection>
                    <h2>Tool</h2>
                    <ButtonContainer>
                        <Button>
                        <img
                            src={data.image1.publicURL}
                            alt="Button 1"
                            style={{ width: "3rem", height: "3rem" }}
                        />
                        <ButtonText>Metal</ButtonText>
                        </Button>
                        <Button>
                        <img
                            src={data.image2.publicURL}
                            alt="Button 2"
                            style={{ width: "3rem", height: "3rem" }}
                        />
                        <ButtonText>ARKit</ButtonText>
                        </Button>
                        <Button>
                        <img
                            src={data.image3.publicURL}
                            alt="Button 3"
                            style={{ width: "3rem", height: "3rem" }}
                        />
                        <ButtonText>SceneKit</ButtonText>
                        </Button>
                        <Button>
                        <img
                            src={data.image4.publicURL}
                            alt="Button 4"
                            style={{ width: "3rem", height: "3rem" }}
                        />
                        <ButtonText>Figma</ButtonText>
                        </Button>
                        <Button>
                        <img
                            src={data.image5.publicURL}
                            alt="Button 5"
                            style={{ width: "3rem", height: "3rem" }}
                        />
                        <ButtonText>SwiftUI</ButtonText>
                        </Button>
                    </ButtonContainer>
                </RightSection>
            </div>
            <MDXRenderer>{body}</MDXRenderer>
          </StyledContentWrapper>
        </StyledSection>
      </Layout>
    </GlobalStateProvider>
  )
}

Project1.propTypes = {
  data: PropTypes.shape({
    project1: PropTypes.shape({
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

export default Project1

export const pageQuery = graphql`
  {
    project1: allMdx(filter: { fileAbsolutePath: { regex: "/project1/" } }) {
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
    webmFile: file(relativePath: { eq: "project1/finalzip.mp4" }) {
      publicURL
    }
    image1: file(relativePath: { eq: "project1/icon1.png" }) {
      publicURL
    }
    image2: file(relativePath: { eq: "project1/icon2.png" }) {
      publicURL
    }
    image3: file(relativePath: { eq: "project1/icon3.png" }) {
      publicURL
    }
    image4: file(relativePath: { eq: "project2/Frame 80.png" }) {
      publicURL
    }
    image5: file(relativePath: { eq: "project2/Frame 79.png" }) {
      publicURL
    }
  }
`
