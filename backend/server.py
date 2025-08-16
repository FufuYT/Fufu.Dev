from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid, os, logging, json
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB Atlas connection
mongo_url = os.environ["MONGO_URL"]
db_name = os.environ["DB_NAME"]
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI(title="FufuDev Portfolio API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# ----- MODELS -----
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

# ----- API ROUTES -----
@api_router.get("/")
async def root():
    return {"message": "FufuDev Portfolio API", "version": "1.0.0"}

@api_router.post("/contact", response_model=dict)
async def create_contact(contact_data: ContactCreate):
    contact = Contact(**contact_data.dict())
    await db.contacts.insert_one(contact.dict())
    return {"success": True, "message": "Message sent!", "id": contact.id}

@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find({"status": "active"}).to_list(100)
    return [Project(**p) for p in projects]

@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({"active": True}).sort("order", 1).to_list(100)
    return [Service(**s) for s in services]

@api_router.get("/profile", response_model=Profile)
async def get_profile():
    profile = await db.profiles.find_one({"id": "profile"})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return Profile(**profile)

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({"approved": True}).to_list(100)
    return [Testimonial(**t) for t in testimonials]

# ----- SEED DATABASE -----
async def seed_database():
    existing_projects = await db.projects.count_documents({})
    if existing_projects > 0:
        logging.info("Database already seeded, skipping...")
        return

    data_file = ROOT_DIR / "frontend/data/data.json"
    if not data_file.exists():
        logging.error("data.json file not found!")
        return

    with open(data_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    try:
        if "projects" in data:
            await db.projects.insert_many(data["projects"])
        if "services" in data:
            await db.services.insert_many(data["services"])
        if "profile" in data:
            await db.profiles.insert_one(data["profile"])
        if "testimonials" in data:
            await db.testimonials.insert_many(data["testimonials"])
        logging.info("Database seeded successfully from data.json!")
    except Exception as e:
        logging.error(f"Error seeding database: {e}")

# ----- APP SETUP -----
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    await seed_database()
    logger.info("FufuDev Portfolio API started successfully!")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
