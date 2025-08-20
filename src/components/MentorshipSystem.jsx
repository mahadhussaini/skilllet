import { useState, useEffect } from 'react';
import { UserCheck, Users, Calendar, MessageCircle, Star, Clock, Target, Award, BookOpen } from 'lucide-react';
import useStore from '../store/useStore';

const MentorshipSystem = () => {
  const { isAuthenticated } = useStore();
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestData, setRequestData] = useState({
    message: '',
    goals: '',
    preferredTime: '',
    skillFocus: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      generateMockData();
    }
  }, [isAuthenticated]);

  const generateMockData = () => {
    const mockMentors = [
      {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah",
        title: "Senior React Developer",
        company: "TechCorp",
        rating: 4.9,
        totalSessions: 47,
        skills: ["React", "JavaScript", "TypeScript", "State Management"],
        experience: "5+ years",
        hourlyRate: 75,
        availability: ["Mon", "Wed", "Fri"],
        timezone: "EST",
        bio: "Passionate about helping developers master React and modern JavaScript. I've mentored 50+ developers and love seeing them grow.",
        specialties: ["Frontend Development", "Code Review", "Career Guidance"],
        languages: ["English", "Mandarin"],
        isAvailable: true,
        responseTime: "2 hours"
      },
      {
        id: 2,
        name: "Mike Rodriguez",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mike",
        title: "Product Manager",
        company: "StartupXYZ",
        rating: 4.8,
        totalSessions: 32,
        skills: ["Product Management", "User Research", "Agile", "Data Analysis"],
        experience: "8+ years",
        hourlyRate: 90,
        availability: ["Tue", "Thu", "Sat"],
        timezone: "PST",
        bio: "Experienced product manager helping aspiring PMs navigate their career path and develop essential skills.",
        specialties: ["Product Strategy", "User Interviews", "Roadmap Planning"],
        languages: ["English", "Spanish"],
        isAvailable: true,
        responseTime: "4 hours"
      },
      {
        id: 3,
        name: "Emma Thompson",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Emma",
        title: "UX/UI Designer",
        company: "Design Studio",
        rating: 4.7,
        totalSessions: 28,
        skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
        experience: "6+ years",
        hourlyRate: 80,
        availability: ["Mon", "Tue", "Thu"],
        timezone: "CST",
        bio: "Creative designer focused on user-centered design principles. I help designers build strong portfolios and improve their skills.",
        specialties: ["Portfolio Review", "Design Systems", "User Testing"],
        languages: ["English"],
        isAvailable: false,
        responseTime: "6 hours"
      },
      {
        id: 4,
        name: "David Kim",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=David",
        title: "Data Scientist",
        company: "DataTech",
        rating: 4.9,
        totalSessions: 41,
        skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
        experience: "7+ years",
        hourlyRate: 85,
        availability: ["Wed", "Fri", "Sun"],
        timezone: "EST",
        bio: "Data science enthusiast helping others break into the field. I focus on practical applications and real-world projects.",
        specialties: ["ML Projects", "Interview Prep", "Statistics"],
        languages: ["English", "Korean"],
        isAvailable: true,
        responseTime: "3 hours"
      }
    ];

    const mockMentees = [
      {
        id: 1,
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alex",
        goals: "Learn React fundamentals and build a portfolio",
        currentLevel: "Beginner",
        skills: ["HTML", "CSS", "Basic JavaScript"],
        preferredSkills: ["React", "JavaScript"],
        availability: ["Mon", "Wed", "Fri"],
        timezone: "EST",
        isActive: true
      },
      {
        id: 2,
        name: "Lisa Wang",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Lisa",
        goals: "Transition from marketing to product management",
        currentLevel: "Intermediate",
        skills: ["Marketing", "Analytics", "Project Management"],
        preferredSkills: ["Product Management", "User Research"],
        availability: ["Tue", "Thu", "Sat"],
        timezone: "PST",
        isActive: true
      }
    ];

    setMentors(mockMentors);
    setMentees(mockMentees);
  };

  const handleRequestMentorship = () => {
    if (!requestData.message || !requestData.goals) return;

    // In a real app, this would send the request to the mentor
    console.log('Mentorship request sent:', {
      mentor: selectedMentor.name,
      ...requestData
    });

    setRequestData({ message: '', goals: '', preferredTime: '', skillFocus: '' });
    setShowRequestModal(false);
    setSelectedMentor(null);
  };

  const MentorCard = ({ mentor }) => (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{mentor.name}</h3>
            {mentor.isAvailable ? (
              <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                Available
              </span>
            ) : (
              <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                Busy
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.title} at {mentor.company}</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{mentor.rating}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">({mentor.totalSessions} sessions)</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">${mentor.hourlyRate}/hr</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.experience}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{mentor.bio}</p>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {mentor.skills.map((skill, index) => (
              <span key={index} className="text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Availability:</span>
            <p className="text-gray-900 dark:text-gray-100">{mentor.availability.join(', ')}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Response time:</span>
            <p className="text-gray-900 dark:text-gray-100">{mentor.responseTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            setSelectedMentor(mentor);
            setShowRequestModal(true);
          }}
          disabled={!mentor.isAvailable}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            mentor.isAvailable
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {mentor.isAvailable ? 'Request Mentorship' : 'Currently Unavailable'}
        </button>
      </div>
    </div>
  );

  const RequestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={selectedMentor.avatar}
              alt={selectedMentor.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Request Mentorship
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                with {selectedMentor.name}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What are your learning goals?
              </label>
              <textarea
                value={requestData.goals}
                onChange={(e) => setRequestData(prev => ({ ...prev, goals: e.target.value }))}
                className="input-field"
                rows={3}
                placeholder="Describe what you want to learn..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills you want to focus on
              </label>
              <input
                type="text"
                value={requestData.skillFocus}
                onChange={(e) => setRequestData(prev => ({ ...prev, skillFocus: e.target.value }))}
                className="input-field"
                placeholder="e.g., React, JavaScript, Product Management"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred meeting time
              </label>
              <select
                value={requestData.preferredTime}
                onChange={(e) => setRequestData(prev => ({ ...prev, preferredTime: e.target.value }))}
                className="input-field"
              >
                <option value="">Select time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 9 PM)</option>
                <option value="weekend">Weekend</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message to mentor
              </label>
              <textarea
                value={requestData.message}
                onChange={(e) => setRequestData(prev => ({ ...prev, message: e.target.value }))}
                className="input-field"
                rows={3}
                placeholder="Introduce yourself and explain why you'd like to work with this mentor..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowRequestModal(false);
                setSelectedMentor(null);
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleRequestMentorship}
              className="btn-primary"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MenteeCard = ({ mentee }) => (
    <div className="card">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={mentee.avatar}
          alt={mentee.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{mentee.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{mentee.currentLevel}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{mentee.goals}</p>
      <div className="flex flex-wrap gap-2">
        {mentee.preferredSkills.map((skill, index) => (
          <span key={index} className="text-xs bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300 px-2 py-1 rounded">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Mentorship System</h3>
        <p className="text-gray-600 dark:text-gray-400">Please log in to access mentorship features</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Mentorship System</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
          Connect with experienced professionals and accelerate your learning journey
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <UserCheck className="w-8 h-8 text-primary-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available Mentors</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mentors.filter(m => m.isAvailable).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Mentees</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{mentees.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Star className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">4.8</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mentors.reduce((sum, m) => sum + m.totalSessions, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Section */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Available Mentors</h2>
        <div className="responsive-grid-2">
          {mentors.map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>

      {/* Mentees Section */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Looking for Mentorship</h2>
        <div className="responsive-grid-3">
          {mentees.map(mentee => (
            <MenteeCard key={mentee.id} mentee={mentee} />
          ))}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && selectedMentor && (
        <RequestModal />
      )}
    </div>
  );
};

export default MentorshipSystem; 