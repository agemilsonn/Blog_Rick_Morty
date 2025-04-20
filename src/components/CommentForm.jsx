import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function CommentForm({ onAddComment }) {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    onAddComment(commentText);
    setCommentText('');
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Deixe seu comentário interdimensional..."
        />
      </Form.Group>
      <Button 
        variant="primary" 
        type="submit" 
        disabled={isSubmitting || !commentText.trim()}
        className="portal-button"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
      </Button>
    </Form>
  );
}

export default CommentForm;