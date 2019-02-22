import React, { Component } from 'react'
import { css } from 'styled-components' 
import FileUploader from 'react-firebase-file-uploader'
import { FiXCircle } from 'react-icons/fi'
import { Line } from 'rc-progress' 
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import firebase from '../utils/firebase'

import theme from '../styles/theme'

class FileUpload extends Component {
  state = {
    isUploading: false,
    downloadURLs: [],
    fileNames: [],
    uploadProgress: 0,
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      uploadProgress: 0
    })
  }

  handleProgress = progress => {
    this.setState({
      uploadProgress: progress
    })
  }

  handleUploadError = error => {
    this.setState({
      isUploading: false
    })

    console.error(error)
  }

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref('images/')
      .child(filename)
      .getDownloadURL()
      
      this.props.onFilesUploaded([this.state.downloadURLs, downloadURL])

      this.setState(oldState => ({
        fileNames: [...oldState.fileNames, filename],
        downloadURLs: [...oldState.downloadURLs, downloadURL],
        uploadProgress: 100,
        isUploading: false,
      }))
  }

  handleDeleteImage = (fileName, downloadURL) => {
    console.log('delete this: ', fileName)
    const imageRef = firebase.storage()
      .ref('images/')
      .child(fileName)

    imageRef.delete().then(() => {
      this.removeImage(fileName, downloadURL)
    }).catch((error) => {
      console.log(error)
    })
  }

  removeImage = (fileName, downloadURL) => {
    let filteredFileNames = this.state.fileNames
      .filter(item => item !== fileName)

    let filteredDownloadURLs = this.state.downloadURLs
      .filter(item => item !== downloadURL)
    
    this.setState({
      fileNames: filteredFileNames,
      downloadURLs: filteredDownloadURLs,
      uploadProgress: 0,
    })
  }

  render() {
    console.log(this.state.isUploading)
    return (
      <div>
        <label
          css={css`
            display: flex;
            background-color: ${props => props.theme.colors.lightGray};
            color: ${props => props.theme.colors.white};
            height: 48px;
            border-radius: 4px;
            padding: 0.25rem;
            width: 50%;
            text-align: center;
            margin-bottom: 1rem;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          `}
        >
          Upload your design
          <FileUploader
            hidden
            accept="image/*"
            name="image-uploader-multiple"
            storageRef={firebase.storage().ref('images/')}
            onUploadStart={this.render.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple
            randomizeFilename
          />
        </label>
        {
          this.state.uploadProgress > 0
            ? <Line
                percent={this.state.uploadProgress}
                strokeWidth="4"
                strokeColor={theme.colors.primary}
                css={css`
                  width: 100px;
                `}
              />
            : null
        }
        <div css={css`
          width: 50%;
        `}>
          {this.state.downloadURLs.map((downloadURL, i) => {
            const fileName = this.state.fileNames[i]
            return (
              <div key={`${fileName}-${i}`}>
                {fileName &&
                  <div
                    css={css`
                      display: flex;
                      position: relative;
                    `}
                  >
                  <div>
                    <StaticQuery
                      query={iPhoneImageQuery}
                      render={(data) => {
                        return <Img fixed={data.contentfulAsset.fixed} />
                      }}
                    />
                    <img
                      src={downloadURL}
                      alt={fileName}
                      css={css`
                        min-width: 350px;
                        height: 100%;
                        position: absolute;
                        top: 80px;
                        left: 24px;
                        height: 640px;
                        filter: grayscale(1) sepia(1) contrast(1.5);
                        opacity: 0.8;
                      `}
                    />
                  </div>
                    <button
                      onClick={(e) => { this.handleDeleteImage(fileName, downloadURL)}}
                      css={css`
                        background-color: unset;
                        border: none;
                        height: 18px;
                        cursor: pointer;
                      `}
                    ><FiXCircle /></button>
                  </div>
                }
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const iPhoneImageQuery = graphql`
  query {
    contentfulAsset(title: { eq: "wooden iphone holder background template"}) {
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
      fixed {
        ...GatsbyContentfulFixed_withWebp
      }
    }
  }
`

export default FileUpload