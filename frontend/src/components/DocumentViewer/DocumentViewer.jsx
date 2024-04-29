import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import './DocumentViewer.css'; // Create a CSS file for styling

const DocumentViewer = ({ documentUrl, documentType }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="document-viewer">
      {documentType === 'pdf' ? (
        <Document
          file={documentUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      ) : (
        <img src={documentUrl} style={{width: '50px'}} alt="Document" className="image-viewer" />
      )}

      {documentType === 'pdf' && (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
};

export default DocumentViewer;
