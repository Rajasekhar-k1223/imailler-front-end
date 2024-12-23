import React, { useEffect, useState } from 'react';

const SanitizeHtml = ({ htmlContent }) => {
  const [sanitizedHtml, setSanitizedHtml] = useState('');

  useEffect(() => {
    const sanitizeHtmlContent = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Remove unwanted classes, ids, and tags
      const elements = doc.body.querySelectorAll('*');
      elements.forEach((element) => {
        element.removeAttribute('class');
        element.removeAttribute('id');

        [...element.attributes].forEach((attr) => {
          if (!['href', 'src', 'alt', 'title'].includes(attr.name)) {
            element.removeAttribute(attr.name);
          }
        });

        if (!['DIV', 'P', 'SPAN', 'BLOCKQUOTE', 'A', 'BR'].includes(element.tagName)) {
          element.remove();
        }
      });

      // Format dates and times to AM/PM
      const timeRegex = /\b(\d{1,2}):(\d{2})\b/g; // Matches time like 14:30 or 2:30
      const dateTimeRegex = /\b(\d{4}-\d{2}-\d{2} \d{1,2}:\d{2})\b/g; // Matches 2024-07-10 14:30

      let updatedHtml = doc.body.innerHTML;

      // Replace time in AM/PM
      updatedHtml = updatedHtml.replace(timeRegex, (match, hours, minutes) => {
        return formatToAMPM(hours, minutes);
      });

      // Replace date-time in AM/PM
      updatedHtml = updatedHtml.replace(dateTimeRegex, (match) => {
        const [date, time] = match.split(' ');
        const [hours, minutes] = time.split(':');
        return `${date} ${formatToAMPM(hours, minutes)}`;
      });

      // Handle blockquote content
      const firstBlockquote = doc.body.querySelector('blockquote');
      if (firstBlockquote) {
        firstBlockquote.innerHTML = `<div class="hidden-content" style="display:none;">${firstBlockquote.innerHTML}</div>`;
        firstBlockquote.innerHTML += `<button class="toggle-btn">Show More</button>`;
      }

      setSanitizedHtml(updatedHtml);
    };

    const formatToAMPM = (hours, minutes) => {
      let hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12; // Convert 24-hour to 12-hour format
      return `${hour}:${minutes} ${ampm}`;
    };

    sanitizeHtmlContent(htmlContent);
  }, [htmlContent]);

  // Toggle Show More / Show Less for blockquote
  const toggleBlockquote = (e) => {
    const blockquote = e.target.closest('blockquote');
    const content = blockquote.querySelector('.hidden-content');
    if (content.style.display === 'none') {
      content.style.display = 'block';
      e.target.textContent = 'Show Less';
    } else {
      content.style.display = 'none';
      e.target.textContent = 'Show More';
    }
  };

  return (
    <div
      className="sanitized-html-container"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      onClick={(e) => {
        if (e.target.classList.contains('toggle-btn')) {
          toggleBlockquote(e);
        }
      }}
    />
  );
};

export default SanitizeHtml;
