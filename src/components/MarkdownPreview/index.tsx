import styled from "styled-components";

const MarkdownPreview = styled.div`
  flex: 1;
  padding: 1rem;
  margin: 0;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  font-size: 1rem;
  line-height: 1.2;
  min-height: 10rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  * {
    margin: 0;
  }
`;

export default MarkdownPreview;
