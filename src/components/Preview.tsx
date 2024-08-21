
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IPost } from '../helpers/types';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { BASE, DEF } from '../helpers/default';
import { Link } from 'react-router-dom';



interface IProps {
  open: boolean;
  post: IPost | null;
  onClose: () => void;
  onComment: (postId: number, commentText: string) => void;
}

export function Preview({ open, onClose, post, onComment }: IProps) {
  const [comment, setComment] = useState<string>('');

  if (!post) return null;
  const handleSubmit = () => {
   
    onComment(post.id, comment);
    setComment('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <Box className="modal-content">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {post.title}

          </Typography>
          <img
            src={post.picture ? BASE + post.picture : DEF}
            style={{ width: '100%', height: 'auto', margin: '16px 0' }}
          />
        </Box>
        <Box className="modal-side-panel">
          <div className="modal-likes">
            <Typography variant="h6">Likes: {post.likes.length}</Typography>
            <ul>
              {post.likes.map((user) => (
                <li key={user.id}>
                  <img src={user.picture ? BASE + user.picture : DEF} alt=""
                    style={{ width: '60px', height: '60px', borderRadius: '70%', marginRight: '20px' }}
                  />
                  <Link className="link" to={'/profile/' + user.id}>  <p>{user.name} {user.surname}</p></Link>
                </li>

              ))}

            </ul>
          </div>
          <Box className="modal-comments">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <strong>Comments: {post.comments.length}</strong>
              <ul>
                {post.comments.map((comment, id) => (
                  <li key={id}>
                    <strong>{comment.user.name} says:</strong>  {comment.content}
                    
                  </li>
                ))}
              </ul>

            </Typography>
          </Box>
          <div className='modal-comment-input'>
            <TextField
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
}









