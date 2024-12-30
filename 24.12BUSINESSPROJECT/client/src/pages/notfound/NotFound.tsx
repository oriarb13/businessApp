import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <Link to="/" className="back-home-btn">Back Home</Link>
    </div>
  );
};

export default NotFound;