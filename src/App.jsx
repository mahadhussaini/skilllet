import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SkillDetail from './pages/SkillDetail';
import CreateSkill from './pages/CreateSkill';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Bookmarks from './pages/Bookmarks';
import Challenges from './pages/Challenges';
import Analytics from './pages/Analytics';
import LearningPaths from './pages/LearningPaths';
import DifficultyAssessment from './pages/DifficultyAssessment';
import SkillGroups from './pages/SkillGroups';
import Mentorship from './pages/Mentorship';
import SocialFeed from './pages/SocialFeed';
import InteractiveQuiz from './pages/InteractiveQuiz';
import MediaLibrary from './pages/MediaLibrary';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skill/:id" element={<SkillDetail />} />
          <Route path="/create" element={<CreateSkill />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          <Route path="/difficulty-assessment" element={<DifficultyAssessment />} />
          <Route path="/groups" element={<SkillGroups />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/social-feed" element={<SocialFeed />} />
          <Route path="/quiz" element={<InteractiveQuiz />} />
          <Route path="/media-library" element={<MediaLibrary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;