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
import BackgroundImage from "gatsby-background-image"
import Underlining from "../styles/underlining"

const StyledSection = styled.section`
  width: 100%;
  max-width: 62.5rem;
  margin: 55rem auto 0;
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
  width: 60%;
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

const Project3 = ({ data }) => {
  const { body, frontmatter } = data.project3.edges[0].node
  const { title, seoTitle, useSeoTitleSuffix, useSplashScreen } = frontmatter

  const globalState = {
    isIntroDone: useSplashScreen ? false : true,
    darkMode: false,
  }

  const backgroundImage = data.backgroundImage.childImageSharp.fluid

  return (
    <GlobalStateProvider initialState={globalState}>
        <BackgroundImage 
            fluid={backgroundImage}
            style={{
            width: "100%",
            height: "auto",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            }}
            >
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
                        <h1 data-testid="heading" style={{ paddingTop: "3rem" }}>
                            {title}
                        </h1>
                        <div style={{ display: "flex" }}>
                            <LeftSection>
                                <h2>My Role</h2>
                                <div className="tags">
                                    <Underlining highlight> - Data Analysis <br/></Underlining>
                                    <Underlining highlight> - Visualization </Underlining>
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
                                    <ButtonText>R</ButtonText>
                                    </Button>
                                    <Button>
                                    <img
                                        src={data.image2.publicURL}
                                        alt="Button 2"
                                        style={{ width: "3rem", height: "3rem" }}
                                    />
                                    <ButtonText>Plotly</ButtonText>
                                    </Button>
                                    <Button>
                                    <img
                                        src={data.image3.publicURL}
                                        alt="Button 3"
                                        style={{ width: "3rem", height: "3rem" }}
                                    />
                                    <ButtonText>JavaScript</ButtonText>
                                    </Button>
                                </ButtonContainer>
                            </RightSection>
                        </div>
                        <MDXRenderer>{body}</MDXRenderer>
                    </StyledContentWrapper>
                </StyledSection>
        
            </Layout>
        </BackgroundImage>
    </GlobalStateProvider>
  )
}

Project3.propTypes = {
  data: PropTypes.shape({
    project3: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            body: PropTypes.string.isRequired,
            frontmatter: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
    image1: PropTypes.object.isRequired,
    image2: PropTypes.object.isRequired,
    image3: PropTypes.object.isRequired,
  }).isRequired,
}

export default Project3

export const pageQuery = graphql`
  {
    project3: allMdx(filter: { fileAbsolutePath: { regex: "/project3/" } }) {
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
    backgroundImage: file(relativePath: { eq: "index/projects/extendable-layout/graph38.png" }) {
        childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
            }
        }
    }
    image1: file(relativePath: { eq: "project3/Frame 86.png" }) {
        publicURL
    }
    image2: file(relativePath: { eq: "project3/Frame 87.png" }) {
        publicURL
    }
    image3: file(relativePath: { eq: "project3/Frame 88.png" }) {
        publicURL
    }
  }
`