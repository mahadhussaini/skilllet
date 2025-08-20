import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock data for skills
const mockSkills = [
  {
    id: 1,
    title: "Basic Excel Formulas",
    description: "Learn essential Excel formulas like SUM, AVERAGE, and VLOOKUP in just 8 minutes",
    category: "Tech",
    estimatedTime: 8,
    tags: ["excel", "formulas", "productivity"],
    author: "DataPro",
    upvotes: 156,
    views: 2340,
    type: "video",
    content: "https://example.com/excel-video.mp4",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    createdAt: "2024-01-15",
    comments: 23
  },
  {
    id: 2,
    title: "How to Tie a Tie",
    description: "Master the classic four-in-hand knot with this step-by-step visual guide",
    category: "Lifestyle",
    estimatedTime: 5,
    tags: ["style", "formal", "basics"],
    author: "StyleGuru",
    upvotes: 89,
    views: 1250,
    type: "infographic",
    content: "Step-by-step instructions for tying a perfect tie...",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    createdAt: "2024-01-12",
    comments: 12
  },
  {
    id: 3,
    title: "React useEffect Basics",
    description: "Understand React's useEffect hook with practical examples and common patterns",
    category: "Tech",
    estimatedTime: 10,
    tags: ["react", "hooks", "javascript"],
    author: "ReactMaster",
    upvotes: 234,
    views: 3890,
    type: "text",
    content: "The useEffect hook is one of the most important React hooks...",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    createdAt: "2024-01-10",
    comments: 45
  },
  {
    id: 4,
    title: "5-Minute Morning Stretches",
    description: "Quick stretching routine to energize your day and improve flexibility",
    category: "Health",
    estimatedTime: 5,
    tags: ["fitness", "stretching", "morning"],
    author: "FitnessPro",
    upvotes: 178,
    views: 2100,
    type: "video",
    content: "https://example.com/stretch-video.mp4",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
    createdAt: "2024-01-08",
    comments: 18
  },
  {
    id: 5,
    title: "Basic Photography Composition",
    description: "Learn the rule of thirds and other essential composition techniques",
    category: "Creative",
    estimatedTime: 7,
    tags: ["photography", "composition", "basics"],
    author: "PhotoArt",
    upvotes: 145,
    views: 1876,
    type: "infographic",
    content: "Photography composition rules and techniques...",
    thumbnail: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop",
    createdAt: "2024-01-05",
    comments: 31
  }
];

  const _mockUsers = [
  {
    id: 1,
    username: "DataPro",
    email: "datapro@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    skillsCreated: 12,
    totalUpvotes: 890,
    badges: ["Excel Expert", "Top Contributor", "Rising Star"],
    joinedAt: "2023-06-15"
  },
  {
    id: 2,
    username: "StyleGuru",
    email: "styleguru@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop",
    skillsCreated: 8,
    totalUpvotes: 456,
    badges: ["Style Master", "Community Helper"],
    joinedAt: "2023-08-20"
  }
];

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      currentUser: null,
      isAuthenticated: false,
      
      // Skills state
      skills: mockSkills,
      filteredSkills: mockSkills,
      selectedCategory: 'All',
      searchQuery: '',
      
      // User progress
      completedSkills: [],
      bookmarkedSkills: [],
      userProgress: {},
      
      // UI state
      isLoading: false,
      
      // Actions
      login: (user) => set({ currentUser: user, isAuthenticated: true }),
      logout: () => set({ currentUser: null, isAuthenticated: false }),
      
      // Skills actions
      setSkills: (skills) => set({ skills, filteredSkills: skills }),
      addSkill: (skill) => {
        const newSkill = {
          ...skill,
          id: Date.now(),
          upvotes: 0,
          views: 0,
          comments: 0,
          createdAt: new Date().toISOString().split('T')[0]
        };
        set((state) => ({
          skills: [newSkill, ...state.skills],
          filteredSkills: [newSkill, ...state.filteredSkills]
        }));
        return newSkill;
      },
      
      upvoteSkill: (skillId) => {
        set((state) => {
          const updatedSkills = state.skills.map(skill =>
            skill.id === skillId
              ? { ...skill, upvotes: skill.upvotes + 1 }
              : skill
          );
          return {
            skills: updatedSkills,
            filteredSkills: state.filteredSkills.map(skill =>
              skill.id === skillId
                ? { ...skill, upvotes: skill.upvotes + 1 }
                : skill
            )
          };
        });
      },
      
      // Filter actions
      setCategory: (category) => {
        set({ selectedCategory: category });
        get().filterSkills();
      },
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterSkills();
      },
      
      filterSkills: () => {
        const { skills, selectedCategory, searchQuery } = get();
        let filtered = skills;
        
        if (selectedCategory !== 'All') {
          filtered = filtered.filter(skill => skill.category === selectedCategory);
        }
        
        if (searchQuery) {
          filtered = filtered.filter(skill =>
            skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }
        
        set({ filteredSkills: filtered });
      },
      
      // Progress actions
      completeSkill: (skillId) => {
        set((state) => ({
          completedSkills: [...new Set([...state.completedSkills, skillId])],
          userProgress: {
            ...state.userProgress,
            [skillId]: { completed: true, completedAt: new Date().toISOString() }
          }
        }));
      },
      
      bookmarkSkill: (skillId) => {
        set((state) => {
          const isBookmarked = state.bookmarkedSkills.includes(skillId);
          return {
            bookmarkedSkills: isBookmarked
              ? state.bookmarkedSkills.filter(id => id !== skillId)
              : [...state.bookmarkedSkills, skillId]
          };
        });
      },
      
      // Utility getters
      getSkillById: (id) => get().skills.find(skill => skill.id === id),
      isSkillCompleted: (skillId) => get().completedSkills.includes(skillId),
      isSkillBookmarked: (skillId) => get().bookmarkedSkills.includes(skillId),
      
      // Categories
      getCategories: () => {
        const { skills } = get();
        const categories = [...new Set(skills.map(skill => skill.category))];
        return ['All', ...categories.sort()];
      }
    }),
    {
      name: 'skilllet-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        completedSkills: state.completedSkills,
        bookmarkedSkills: state.bookmarkedSkills,
        userProgress: state.userProgress
      })
    }
  )
);

export default useStore;