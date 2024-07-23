import React from "react";

const renderPostText = (text) => {
  const linkRegex = /https?:\/\/[^\s]+/g;
  const parts = text.split(linkRegex);

  return parts.map((part, index) => {
    const link = text.match(linkRegex)?.[index];
    return (
      <React.Fragment key={index}>
        {part}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {link}
          </a>
        )}
      </React.Fragment>
    );
  });
};

export default renderPostText