from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="FufuDev Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    language: str = "en"
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    language: str = "en"

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Dict[str, str]
    technologies: List[str]
    status: str = "active"
    type: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: Dict[str, str]
    description: Dict[str, str]
    icon: str
    active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Profile(BaseModel):
    id: str = "profile"
    name: str
    email: str
    bio: Dict[str, str]
    skills: List[str]
    location: Dict[str, str]
    avatar_url: Optional[str] = None
    resume_url: Optional[str] = None
    social_links: Dict[str, str] = {}
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: Dict[str, str]
    content: Dict[str, str]
    rating: int = 5
    company: Optional[str] = None
    avatar_url: Optional[str] = None
    approved: bool = True
    featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

# API Routes
@api_router.get("/")
async def root():
    return {"message": "FufuDev Portfolio API", "version": "1.0.0"}

# Contact endpoints
@api_router.post("/contact", response_model=dict)
async def create_contact(contact_data: ContactCreate):
    try:
        contact = Contact(**contact_data.dict())
        result = await db.contacts.insert_one(contact.dict())
        
        return {
            "success": True,
            "message": "Message sent successfully!",
            "id": contact.id
        }
    except Exception as e:
        logging.error(f"Error creating contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message")

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
    return [Contact(**contact) for contact in contacts]

# Projects endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find({"status": "active"}).to_list(100)
    return [Project(**project) for project in projects]

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return Project(**project)

# Services endpoints
@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({"active": True}).sort("order", 1).to_list(100)
    return [Service(**service) for service in services]

# Profile endpoints
@api_router.get("/profile", response_model=Profile)
async def get_profile():
    profile = await db.profiles.find_one({"id": "profile"})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return Profile(**profile)

# Testimonials endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({"approved": True}).to_list(100)
    return [Testimonial(**testimonial) for testimonial in testimonials]

# Seed data function
async def seed_database():
    """Initialize database with default data"""
    
    # Check if data already exists
    existing_projects = await db.projects.count_documents({})
    if existing_projects > 0:
        logging.info("Database already seeded, skipping...")
        return
    
    # Seed Projects
    projects_data = [
        {
            "id": str(uuid.uuid4()),
            "name": "FufuBot",
            "description": {
                "en": "Advanced Discord bot with moderation, music playback, and custom commands. Built with Discord.js and Node.js.",
                "fr": "Bot Discord avancé avec modération, lecture de musique et commandes personnalisées. Construit avec Discord.js et Node.js."
            },
            "technologies": ["Discord.js", "Node.js", "JavaScript", "MongoDB"],
            "status": "active",
            "type": "Discord Bot",
            "featured": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Amazon Checker",
            "description": {
                "en": "Automated Discord bot that monitors Amazon product prices and sends notifications. Features real-time price tracking and alerts.",
                "fr": "Bot Discord automatisé qui surveille les prix des produits Amazon et envoie des notifications. Fonctionnalités de suivi des prix en temps réel et d'alertes."
            },
            "technologies": ["Discord.js", "Python", "Amazon API", "Web Scraping"],
            "status": "active",
            "type": "Discord Bot",
            "featured": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    # Seed Services
    services_data = [
        {
            "id": str(uuid.uuid4()),
            "title": {
                "en": "Web Development",
                "fr": "Développement Web"
            },
            "description": {
                "en": "Modern, responsive websites and web applications using the latest technologies.",
                "fr": "Sites web et applications web modernes et réactifs utilisant les dernières technologies."
            },
            "icon": "Globe",
            "active": True,
            "order": 1,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": {
                "en": "Discord Bots",
                "fr": "Bots Discord"
            },
            "description": {
                "en": "Custom Discord bots with moderation, automation, and entertainment features.",
                "fr": "Bots Discord personnalisés avec des fonctionnalités de modération, d'automatisation et de divertissement."
            },
            "icon": "Bot",
            "active": True,
            "order": 2,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": {
                "en": "Automation Tools",
                "fr": "Outils d'Automatisation"
            },
            "description": {
                "en": "Scripts and tools to automate repetitive tasks and improve productivity.",
                "fr": "Scripts et outils pour automatiser les tâches répétitives et améliorer la productivité."
            },
            "icon": "Settings",
            "active": True,
            "order": 3,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": {
                "en": "API Integration",
                "fr": "Intégration d'API"
            },
            "description": {
                "en": "Seamless integration of third-party APIs and services into your applications.",
                "fr": "Intégration transparente d'API et de services tiers dans vos applications."
            },
            "icon": "Plug",
            "active": True,
            "order": 4,
            "created_at": datetime.utcnow()
        }
    ]
    
    # Seed Profile
    profile_data = {
        "id": "profile",
        "name": "FufuDev",
        "email": "b22041702@gmail.com",
        "bio": {
            "en": "Passionate developer specializing in web development and Discord bot creation. I love building innovative solutions that solve real-world problems and enhance user experiences.",
            "fr": "Développeur passionné spécialisé dans le développement web et la création de bots Discord. J'aime créer des solutions innovantes qui résolvent des problèmes du monde réel et améliorent l'expérience utilisateur."
        },
        "skills": ["JavaScript", "Python", "Node.js", "React", "MongoDB", "Discord.js", "Web Scraping", "API Integration"],
        "location": {
            "en": "Available for remote work",
            "fr": "Disponible pour le travail à distance"
        },
        "social_links": {},
        "updated_at": datetime.utcnow()
    }
    
    # Seed Testimonials
    testimonials_data = [
        {
            "id": str(uuid.uuid4()),
            "name": "Alex Johnson",
            "role": {
                "en": "Community Manager",
                "fr": "Gestionnaire de Communauté"
            },
            "content": {
                "en": "FufuBot transformed our Discord server! The moderation features and custom commands work perfectly.",
                "fr": "FufuBot a transformé notre serveur Discord ! Les fonctionnalités de modération et les commandes personnalisées fonctionnent parfaitement."
            },
            "rating": 5,
            "approved": True,
            "featured": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Sarah Miller",
            "role": {
                "en": "E-commerce Owner",
                "fr": "Propriétaire E-commerce"
            },
            "content": {
                "en": "The Amazon Checker bot helped me track competitor prices effortlessly. Great automation tool!",
                "fr": "Le bot Amazon Checker m'a aidé à suivre les prix des concurrents sans effort. Excellent outil d'automatisation !"
            },
            "rating": 5,
            "approved": True,
            "featured": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    # Insert all data
    try:
        await db.projects.insert_many(projects_data)
        await db.services.insert_many(services_data)
        await db.profiles.insert_one(profile_data)
        await db.testimonials.insert_many(testimonials_data)
        
        logging.info("Database seeded successfully!")
    except Exception as e:
        logging.error(f"Error seeding database: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
