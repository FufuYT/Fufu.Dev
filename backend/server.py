from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid, os, logging, json
from datetime import datetime

ROOT_DIR = Path(__file__).parent
DATA_FILE = ROOT_DIR / "data/data.json"

load_dotenv(ROOT_DIR / ".env")

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

# ----- DATA LOADING -----
def load_data():
    if not DATA_FILE.exists():
        return {"projects": [], "services": [], "profile": None, "testimonials": [], "contacts": []}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_data(data: dict):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False, default=str)

db_data = load_data()

# ----- API ROUTES -----
@api_router.get("/")
async def root():
    return {"message": "FufuDev Portfolio API", "version": "1.0.0"}

@api_router.post("/contact", response_model=dict)
async def create_contact(contact_data: ContactCreate):
    contact = Contact(**contact_data.dict())
    db_data["contacts"].append(contact.dict())
    save_data(db_data)
    return {"success": True, "message": "Message sent!", "id": contact.id}

@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    return [Project(**p) for p in db_data.get("projects", []) if p.get("status") == "active"]

@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = sorted(
        [Service(**s) for s in db_data.get("services", []) if s.get("active")],
        key=lambda x: x.order
    )
    return services

@api_router.get("/profile", response_model=Profile)
async def get_profile():
    profile = db_data.get("profile")
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return Profile(**profile)

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    return [Testimonial(**t) for t in db_data.get("testimonials", []) if t.get("approved")]

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
    global db_data
    db_data = load_data()
    logger.info("FufuDev Portfolio API started successfully!")
