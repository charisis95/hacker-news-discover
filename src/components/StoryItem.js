import React from 'react';

const StoryItem = ({ story, query, highlightSearchTerm, onClick, onDelete }) => {

    const handleDelete = () => {
        if (onDelete) {
            onDelete(story);
        }
    };

    return (
        <li className="story-item" style={{ cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
            <div>
                <strong>{highlightSearchTerm ? highlightSearchTerm(story.title, query) : story.title}</strong> <br />
                {story.points} points | by {story.author} | {story.num_comments} comments
            </div>
            {onDelete && (
                <div className="delete-btn" onClick={handleDelete}>Delete</div>
            )}
        </li>
    );
};

export default StoryItem;