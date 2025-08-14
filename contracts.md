# FufuDev Portfolio - Backend Integration Contracts

## Overview
This document outlines the backend API contracts and integration plan for the FufuDev portfolio website.

## Current Mock Data to Replace

### 1. Mock Projects Data (`mockProjects`)
**Location**: `/frontend/src/utils/mock.js`
**Current**: Static array of 2 Discord bot projects
**Backend Integration**: Dynamic projects from MongoDB

### 2. Mock Services Data (`mockServices`)
**Location**: `/frontend/src/utils/mock.js`
**Current**: Static service offerings
**Backend Integration**: Configurable services from database

### 3. Mock Personal Info (`mockPersonalInfo`)
**Location**: `/frontend/src/utils/mock.js`
**Current**: Static personal information
**Backend Integration**: Configurable profile data

### 4. Mock Testimonials (`mockTestimonials`)
**Location**: `/frontend/src/utils/mock.js`
**Current**: Static testimonials
**Backend Integration**: Manageable testimonials system

## API Endpoints to Implement

### 1. Contact Management
```
POST /api/contact
- Body: { name, email, subject, message, language }
- Response: { success: boolean, message: string, id: string }
- Function: Store contact form submissions
```

### 2. Projects Management
```
GET /api/projects
- Response: Array of project objects
- Function: Fetch all active projects

GET /api/projects/{id}
- Response: Single project object
- Function: Fetch specific project details

POST /api/projects (Admin only - future)
- Body: Project object
- Function: Create new project
```

### 3. Services Management
```
GET /api/services
- Response: Array of service objects
- Function: Fetch all active services
```

### 4. Profile Information
```
GET /api/profile
- Response: Personal information object
- Function: Fetch profile data including bio, skills, contact info
```

### 5. Testimonials
```
GET /api/testimonials
- Response: Array of testimonial objects
- Function: Fetch approved testimonials
```

### 6. Analytics (Optional)
```
POST /api/analytics/visit
- Body: { page, referrer, userAgent, language }
- Function: Track website visits

GET /api/analytics/stats (Admin only - future)
- Response: Visit statistics
- Function: Get analytics data
```

## Database Models

### 1. Contact Model
```python
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    language: str = "en"
    status: str = "new"  # new, read, replied
    created_at: datetime = Field(default_factory=datetime.utcnow)
    replied_at: Optional[datetime] = None
```

### 2. Project Model
```python
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Dict[str, str]  # {"en": "...", "fr": "..."}
    technologies: List[str]
    status: str = "active"  # active, completed, archived
    type: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 3. Service Model
```python
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: Dict[str, str]  # {"en": "...", "fr": "..."}
    description: Dict[str, str]  # {"en": "...", "fr": "..."}
    icon: str
    active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### 4. Profile Model
```python
class Profile(BaseModel):
    id: str = "profile"  # Single profile document
    name: str
    email: str
    bio: Dict[str, str]  # {"en": "...", "fr": "..."}
    skills: List[str]
    location: Dict[str, str]  # {"en": "...", "fr": "..."}
    avatar_url: Optional[str] = None
    resume_url: Optional[str] = None
    social_links: Dict[str, str] = {}  # {"github": "...", "linkedin": "..."}
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 5. Testimonial Model
```python
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: Dict[str, str]  # {"en": "...", "fr": "..."}
    content: Dict[str, str]  # {"en": "...", "fr": "..."}
    rating: int = 5
    company: Optional[str] = None
    avatar_url: Optional[str] = None
    approved: bool = False
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### 6. Analytics Model
```python
class Visit(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page: str
    referrer: Optional[str] = None
    user_agent: Optional[str] = None
    language: str = "en"
    ip_address: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
```

## Frontend Integration Changes

### 1. Replace Mock Data Imports
- Remove imports from `mock.js`
- Add API service functions
- Implement loading states
- Add error handling

### 2. API Service Layer
Create `/frontend/src/services/api.js`:
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const contactAPI = {
  submit: (data) => axios.post(`${API_BASE}/contact`, data)
};

export const projectsAPI = {
  getAll: () => axios.get(`${API_BASE}/projects`),
  getById: (id) => axios.get(`${API_BASE}/projects/${id}`)
};

// ... other API services
```

### 3. State Management
- Add loading states to components
- Implement error boundaries
- Add retry mechanisms
- Show skeleton loaders

## Implementation Priority

### Phase 1: Core Backend Setup
1. ✅ Contact form API
2. ✅ Projects API with seed data
3. ✅ Basic error handling
4. ✅ CORS configuration

### Phase 2: Frontend Integration
1. ✅ Replace mock data with API calls
2. ✅ Add loading states
3. ✅ Implement error handling
4. ✅ Test all functionality

### Phase 3: Enhanced Features (Optional)
1. Analytics tracking
2. Admin panel for content management
3. Email notifications for contacts
4. Image upload functionality

## Success Criteria
- ✅ Contact form saves to database and shows success message
- ✅ Projects load dynamically from database
- ✅ All pages load without errors
- ✅ Language switching works with dynamic content
- ✅ Responsive design maintained
- ✅ Performance optimized with proper loading states