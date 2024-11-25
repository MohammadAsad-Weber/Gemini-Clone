import React from 'react';
import { marked } from 'marked'; // Markdown to HTML
import DOMPurify from 'dompurify'; // Purifying the HTML code
import './MessageBox.css'; // StyleSheet

function MessageBox(props) {

  const rawHtml = marked(props.message); // creating raw html from markdown
  const sanitizedHtml = DOMPurify.sanitize(rawHtml) // Sanitize HTML to prevent XSS attacks

  return (
    <div id='message-box'>
      <img src={props.img} alt="" />
      <div id="message" dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
    </div>
  )
}

export default MessageBox;