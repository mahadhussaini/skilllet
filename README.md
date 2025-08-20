# Skilllet - Crowdsourced Micro-Skills Learning Platform

A modern React-based platform for sharing and learning bite-sized skills in under 10 minutes.

## 🚀 Features

### Core Features
- **Home Feed**: Browse trending micro-skills with smart filtering by categories
- **Lesson Cards**: Interactive cards showing skill details, estimated time, and engagement metrics
- **Detailed Lesson Pages**: Rich content display with video, text, and infographic support
- **Crowdsourced Content**: Any user can create and publish micro-skill lessons
- **Advanced Search**: Filter by categories (Tech, Lifestyle, Business, Health, Creative, DIY)

### Gamification
- **Upvote System**: Community-driven content ranking
- **Badges & Achievements**: Reward system for contributors and learners
- **Leaderboard**: Showcase top contributors and trending skills
- **Progress Tracking**: Personal learning journey and completed skills

### User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Bookmarking**: Save skills for later learning
- **User Profiles**: Track personal progress and contributions
- **Authentication**: Mock login/signup system
- **Interactive UI**: Smooth transitions and modern design

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: Zustand with persistence
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Data**: Mock JSON data with localStorage persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.jsx                    # Main layout with navigation
│   ├── SkillCard.jsx                 # Reusable skill card component
│   ├── RecommendationEngine.jsx      # AI-powered skill recommendations
│   ├── CollaborativeChallenge.jsx    # Community learning challenges
│   ├── DiscussionForum.jsx           # Real-time discussions
│   ├── AnalyticsDashboard.jsx        # Creator analytics and insights
│   ├── LearningPaths.jsx             # AI-generated learning sequences
│   ├── SkillDifficultyAssessment.jsx # Community difficulty voting
│   ├── SkillGroups.jsx               # Interest-based learning communities
│   ├── MentorshipSystem.jsx          # Mentor-mentee matching system
│   ├── SocialFeed.jsx                # Social activity feed
│   ├── InteractiveQuiz.jsx           # Assessment and quiz system
│   ├── RichTextEditor.jsx            # Enhanced content editor
│   └── MediaLibrary.jsx              # Media storage and management
├── pages/
│   ├── Home.jsx                      # Home feed with search/filter
│   ├── SkillDetail.jsx               # Individual skill page
│   ├── CreateSkill.jsx               # Skill creation form
│   ├── Profile.jsx                   # User profile and dashboard
│   ├── Bookmarks.jsx                 # Saved skills
│   ├── Leaderboard.jsx               # Gamification features
│   ├── Challenges.jsx                # Collaborative challenges page
│   ├── Analytics.jsx                 # Analytics dashboard page
│   ├── LearningPaths.jsx             # Learning paths page
│   ├── DifficultyAssessment.jsx      # Difficulty assessment page
│   ├── SkillGroups.jsx               # Skill groups page
│   ├── Mentorship.jsx                # Mentorship page
│   ├── SocialFeed.jsx                # Social feed page
│   ├── InteractiveQuiz.jsx           # Interactive quiz page
│   ├── MediaLibrary.jsx              # Media library page
│   ├── Login.jsx                     # Authentication
│   └── Signup.jsx                    # User registration
├── store/
│   └── useStore.js                   # Zustand store with all app state
├── App.jsx                           # Main app with routing
└── index.css                         # Tailwind CSS with custom components
```

## 🎯 Key Components

### State Management (Zustand Store)
- User authentication and profiles
- Skills data with CRUD operations
- Progress tracking and bookmarks
- Search and filter functionality
- Persistent storage with localStorage

### Custom Tailwind Components
- `.btn-primary` / `.btn-secondary` - Consistent button styles
- `.card` - Reusable card component
- `.input-field` - Standardized form inputs
- `.skill-card` - Specialized skill display cards
- `.badge` - Category and status indicators

### Mock Data Features
- Sample skills across different categories
- User profiles with avatars and stats
- Engagement metrics (upvotes, views, comments)
- Achievement badges and leaderboard rankings

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 💡 Usage

### For Learners
1. Browse skills on the home feed
2. Use search and category filters to find relevant content
3. Click on skill cards to view detailed lessons
4. Bookmark skills for later learning
5. Mark skills as completed to track progress
6. View your learning stats in your profile

### For Contributors
1. Sign up/login to create skills
2. Use the "Create" page to publish new lessons
3. Add rich content with text, videos, or infographics
4. Tag skills appropriately for discoverability
5. Track your skill performance and community engagement
6. Earn badges and climb the leaderboard

## 🎨 Design Features

- **Mobile-First**: Optimized for mobile devices with responsive breakpoints
- **Modern UI**: Clean design with consistent spacing and typography
- **Smooth Animations**: CSS transitions for better user experience
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Visual Hierarchy**: Clear content organization and visual cues

## 🔧 Customization

### Adding New Categories
Update the mock data in `src/store/useStore.js` and add corresponding color schemes in the components.

### Extending Content Types
Modify the skill creation form and detail page to support additional content formats.

### Adding Real Backend
Replace the Zustand store persistence with API calls to your backend service.

## 📈 Future Enhancements

### Stretch Features (Implemented)
- **AI-powered Recommendations**: Smart skill suggestions based on user interests
- **Collaborative Challenges**: Community-driven learning challenges with step voting
- **Real-time Discussions**: Comment system with replies and likes for each lesson

### Advanced Analytics & Insights (New)
- **Analytics Dashboard**: Detailed metrics for creators (views, completion rates, engagement)
- **Learning Paths**: AI-generated learning sequences connecting related skills
- **Skill Difficulty Assessment**: Community-voted difficulty ratings and time estimates
- **Progress Visualization**: Charts and graphs showing learning progress over time

### Social & Community Features (New)
- **Skill Groups/Clubs**: Interest-based learning communities with discussions and events
- **Mentorship System**: Connect experienced users with beginners for skill development
- **Social Feed**: Activity feed showing friends' learning progress and achievements
- **Community Engagement**: Like, share, and comment on learning activities

### Content Enhancement Features (New)
- **Interactive Quizzes**: Built-in assessment tools with multiple question types and scoring
- **Rich Text Editor**: Enhanced lesson creation with formatting, media embedding, and structured content
- **Media Library**: Cloud storage for images, videos, and documents with organization tools
- **Content Management**: Upload, organize, and manage learning materials efficiently

### Backend Integration
- User authentication with JWT
- File upload for media content
- Real-time notifications
- Advanced search with Elasticsearch
- Analytics and reporting dashboard

## 🤝 Contributing

This project structure makes it easy to extend and customize. The modular component design and centralized state management allow for easy feature additions and modifications.

## 📄 License

MIT License - feel free to use this project as a foundation for your own learning platform!

---

**Built with ❤️ using React, Vite, and Tailwind CSS**