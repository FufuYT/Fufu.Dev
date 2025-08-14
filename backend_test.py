#!/usr/bin/env python3
"""
FufuDev Portfolio Backend API Test Suite
Tests all backend API endpoints comprehensively
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend/.env
BASE_URL = "https://modern-devsite-7.preview.emergentagent.com/api"

class APITester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        self.passed_tests = []
        
    def log_test(self, test_name, status, details):
        """Log test results"""
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        if status == "PASS":
            self.passed_tests.append(test_name)
            print(f"✅ {test_name}: PASSED")
        else:
            self.failed_tests.append(test_name)
            print(f"❌ {test_name}: FAILED - {details}")
    
    def test_api_health(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_test("API Health Check", "PASS", 
                                f"Status: {response.status_code}, Response: {data}")
                else:
                    self.log_test("API Health Check", "FAIL", 
                                f"Missing required fields in response: {data}")
            else:
                self.log_test("API Health Check", "FAIL", 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("API Health Check", "FAIL", f"Exception: {str(e)}")
    
    def test_projects_api(self):
        """Test Projects API endpoints"""
        # Test GET /api/projects
        try:
            response = requests.get(f"{BASE_URL}/projects", timeout=10)
            
            if response.status_code == 200:
                projects = response.json()
                
                # Verify it's a list
                if not isinstance(projects, list):
                    self.log_test("GET Projects", "FAIL", "Response is not a list")
                    return
                
                # Verify we have 2 Discord bot projects
                discord_bots = [p for p in projects if p.get("type") == "Discord Bot"]
                if len(discord_bots) != 2:
                    self.log_test("GET Projects", "FAIL", 
                                f"Expected 2 Discord bot projects, found {len(discord_bots)}")
                    return
                
                # Verify project structure
                required_fields = ["id", "name", "description", "technologies", "status", "type", "featured"]
                for project in projects:
                    missing_fields = [field for field in required_fields if field not in project]
                    if missing_fields:
                        self.log_test("GET Projects", "FAIL", 
                                    f"Missing fields in project: {missing_fields}")
                        return
                    
                    # Verify description is multilingual
                    if not isinstance(project["description"], dict) or "en" not in project["description"]:
                        self.log_test("GET Projects", "FAIL", 
                                    "Description should be multilingual dict with 'en' key")
                        return
                
                # Verify specific projects exist
                project_names = [p["name"] for p in projects]
                expected_projects = ["FufuBot", "Amazon Checker"]
                for expected in expected_projects:
                    if expected not in project_names:
                        self.log_test("GET Projects", "FAIL", 
                                    f"Expected project '{expected}' not found")
                        return
                
                self.log_test("GET Projects", "PASS", 
                            f"Found {len(projects)} projects with correct structure")
                
                # Test GET /api/projects/{id} with first project
                if projects:
                    project_id = projects[0]["id"]
                    self.test_single_project(project_id)
                    
            else:
                self.log_test("GET Projects", "FAIL", 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("GET Projects", "FAIL", f"Exception: {str(e)}")
    
    def test_single_project(self, project_id):
        """Test GET /api/projects/{id}"""
        try:
            response = requests.get(f"{BASE_URL}/projects/{project_id}", timeout=10)
            
            if response.status_code == 200:
                project = response.json()
                
                # Verify project structure
                required_fields = ["id", "name", "description", "technologies", "status", "type"]
                missing_fields = [field for field in required_fields if field not in project]
                if missing_fields:
                    self.log_test("GET Single Project", "FAIL", 
                                f"Missing fields: {missing_fields}")
                else:
                    self.log_test("GET Single Project", "PASS", 
                                f"Project {project_id} retrieved successfully")
            else:
                self.log_test("GET Single Project", "FAIL", 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("GET Single Project", "FAIL", f"Exception: {str(e)}")
    
    def test_services_api(self):
        """Test GET /api/services"""
        try:
            response = requests.get(f"{BASE_URL}/services", timeout=10)
            
            if response.status_code == 200:
                services = response.json()
                
                # Verify it's a list
                if not isinstance(services, list):
                    self.log_test("GET Services", "FAIL", "Response is not a list")
                    return
                
                # Verify we have 4 services
                if len(services) != 4:
                    self.log_test("GET Services", "FAIL", 
                                f"Expected 4 services, found {len(services)}")
                    return
                
                # Verify service structure and multilingual content
                expected_services = ["Web Development", "Discord Bots", "Automation Tools", "API Integration"]
                service_titles = []
                
                for service in services:
                    required_fields = ["id", "title", "description", "icon", "active"]
                    missing_fields = [field for field in required_fields if field not in service]
                    if missing_fields:
                        self.log_test("GET Services", "FAIL", 
                                    f"Missing fields in service: {missing_fields}")
                        return
                    
                    # Verify multilingual title and description
                    if not isinstance(service["title"], dict) or "en" not in service["title"]:
                        self.log_test("GET Services", "FAIL", 
                                    "Title should be multilingual dict with 'en' key")
                        return
                    
                    if not isinstance(service["description"], dict) or "en" not in service["description"]:
                        self.log_test("GET Services", "FAIL", 
                                    "Description should be multilingual dict with 'en' key")
                        return
                    
                    service_titles.append(service["title"]["en"])
                
                # Verify all expected services are present
                for expected in expected_services:
                    if expected not in service_titles:
                        self.log_test("GET Services", "FAIL", 
                                    f"Expected service '{expected}' not found")
                        return
                
                self.log_test("GET Services", "PASS", 
                            f"Found all 4 expected services with correct multilingual structure")
                
            else:
                self.log_test("GET Services", "FAIL", 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("GET Services", "FAIL", f"Exception: {str(e)}")
    
    def test_profile_api(self):
        """Test GET /api/profile"""
        try:
            response = requests.get(f"{BASE_URL}/profile", timeout=10)
            
            if response.status_code == 200:
                profile = response.json()
                
                # Verify required fields
                required_fields = ["name", "email", "bio", "skills", "location"]
                missing_fields = [field for field in required_fields if field not in profile]
                if missing_fields:
                    self.log_test("GET Profile", "FAIL", 
                                f"Missing fields: {missing_fields}")
                    return
                
                # Verify specific values
                if profile["name"] != "FufuDev":
                    self.log_test("GET Profile", "FAIL", 
                                f"Expected name 'FufuDev', got '{profile['name']}'")
                    return
                
                if profile["email"] != "b22041702@gmail.com":
                    self.log_test("GET Profile", "FAIL", 
                                f"Expected email 'b22041702@gmail.com', got '{profile['email']}'")
                    return
                
                # Verify multilingual bio
                if not isinstance(profile["bio"], dict) or "en" not in profile["bio"]:
                    self.log_test("GET Profile", "FAIL", 
                                "Bio should be multilingual dict with 'en' key")
                    return
                
                # Verify skills is an array
                if not isinstance(profile["skills"], list):
                    self.log_test("GET Profile", "FAIL", "Skills should be an array")
                    return
                
                # Verify location is multilingual
                if not isinstance(profile["location"], dict) or "en" not in profile["location"]:
                    self.log_test("GET Profile", "FAIL", 
                                "Location should be multilingual dict with 'en' key")
                    return
                
                self.log_test("GET Profile", "PASS", 
                            f"Profile retrieved with correct structure and values")
                
            else:
                self.log_test("GET Profile", "FAIL", 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("GET Profile", "FAIL", f"Exception: {str(e)}")
    
    def test_testimonials_api(self):
        """Test GET /api/testimonials"""
        try:
            response = requests.get(f"{BASE_URL}/testimonials", timeout=10)
            
            if response.status_code == 200:
                testimonials = response.json()
                
                # Verify it's a list
                if not isinstance(testimonials, list):
                    self.log_test("GET Testimonials", "FAIL", "Response is not a list")
                    return
                
                # Verify testimonial structure
                for testimonial in testimonials:
                    required_fields = ["id", "name", "role", "content", "rating"]
                    missing_fields = [field for field in required_fields if field not in testimonial]
                    if missing_fields:
                        self.log_test("GET Testimonials", "FAIL", 
                                    f"Missing fields in testimonial: {missing_fields}")
                        return
                    
                    # Verify multilingual content
                    if not isinstance(testimonial["role"], dict) or "en" not in testimonial["role"]:
                        self.log_test("GET Testimonials", "FAIL", 
                                    "Role should be multilingual dict with 'en' key")
                        return
                    
                    if not isinstance(testimonial["content"], dict) or "en" not in testimonial["content"]:
                        self.log_test("GET Testimonials", "FAIL", 
                                    "Content should be multilingual dict with 'en' key")
                        return
                    
                    # Verify rating is a number
                    if not isinstance(testimonial["rating"], int) or testimonial["rating"] < 1 or testimonial["rating"] > 5:
                        self.log_test("GET Testimonials", "FAIL", 
                                    f"Rating should be integer between 1-5, got {testimonial['rating']}")
                        return
                
                self.log_test("GET Testimonials", "PASS", 
                            f"Found {len(testimonials)} testimonials with correct multilingual structure")
                
            else:
                self.log_test("GET Testimonials", "FAIL", 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("GET Testimonials", "FAIL", f"Exception: {str(e)}")
    
    def test_contact_form_api(self):
        """Test Contact Form API endpoints"""
        # Test POST /api/contact
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "I'm interested in your web development services. Could you provide more information about your pricing and availability?",
            "language": "en"
        }
        
        try:
            response = requests.post(f"{BASE_URL}/contact", 
                                   json=contact_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                
                # Verify response structure
                if "success" not in result or "message" not in result or "id" not in result:
                    self.log_test("POST Contact", "FAIL", 
                                f"Missing fields in response: {result}")
                    return
                
                if result["success"] != True:
                    self.log_test("POST Contact", "FAIL", 
                                f"Expected success=true, got {result['success']}")
                    return
                
                contact_id = result["id"]
                self.log_test("POST Contact", "PASS", 
                            f"Contact created successfully with ID: {contact_id}")
                
                # Test GET /api/contacts to verify contact was saved
                self.test_get_contacts(contact_data)
                
            else:
                self.log_test("POST Contact", "FAIL", 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("POST Contact", "FAIL", f"Exception: {str(e)}")
    
    def test_get_contacts(self, expected_contact):
        """Test GET /api/contacts"""
        try:
            response = requests.get(f"{BASE_URL}/contacts", timeout=10)
            
            if response.status_code == 200:
                contacts = response.json()
                
                # Verify it's a list
                if not isinstance(contacts, list):
                    self.log_test("GET Contacts", "FAIL", "Response is not a list")
                    return
                
                # Find our submitted contact
                found_contact = None
                for contact in contacts:
                    if (contact.get("name") == expected_contact["name"] and 
                        contact.get("email") == expected_contact["email"]):
                        found_contact = contact
                        break
                
                if not found_contact:
                    self.log_test("GET Contacts", "FAIL", 
                                "Submitted contact not found in contacts list")
                    return
                
                # Verify contact structure
                required_fields = ["id", "name", "email", "subject", "message", "language", "status", "created_at"]
                missing_fields = [field for field in required_fields if field not in found_contact]
                if missing_fields:
                    self.log_test("GET Contacts", "FAIL", 
                                f"Missing fields in contact: {missing_fields}")
                    return
                
                self.log_test("GET Contacts", "PASS", 
                            f"Contact retrieved successfully from contacts list")
                
            else:
                self.log_test("GET Contacts", "FAIL", 
                            f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("GET Contacts", "FAIL", f"Exception: {str(e)}")
    
    def test_error_handling(self):
        """Test error handling scenarios"""
        # Test invalid project ID
        try:
            invalid_id = "invalid-project-id-12345"
            response = requests.get(f"{BASE_URL}/projects/{invalid_id}", timeout=10)
            
            if response.status_code == 404:
                self.log_test("Error Handling - Invalid Project ID", "PASS", 
                            f"Correctly returned 404 for invalid project ID")
            else:
                self.log_test("Error Handling - Invalid Project ID", "FAIL", 
                            f"Expected 404, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Error Handling - Invalid Project ID", "FAIL", f"Exception: {str(e)}")
        
        # Test malformed contact request
        try:
            malformed_data = {
                "name": "Test User"
                # Missing required fields: email, subject, message
            }
            
            response = requests.post(f"{BASE_URL}/contact", 
                                   json=malformed_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code in [400, 422]:  # Bad Request or Unprocessable Entity
                self.log_test("Error Handling - Malformed Contact", "PASS", 
                            f"Correctly returned {response.status_code} for malformed request")
            else:
                self.log_test("Error Handling - Malformed Contact", "FAIL", 
                            f"Expected 400/422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Error Handling - Malformed Contact", "FAIL", f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting FufuDev Portfolio API Tests")
        print(f"📍 Testing against: {BASE_URL}")
        print("=" * 60)
        
        # Run all tests
        self.test_api_health()
        self.test_projects_api()
        self.test_services_api()
        self.test_profile_api()
        self.test_testimonials_api()
        self.test_contact_form_api()
        self.test_error_handling()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {len(self.passed_tests)}")
        print(f"❌ Failed: {len(self.failed_tests)}")
        print(f"📈 Success Rate: {len(self.passed_tests)}/{len(self.test_results)} ({len(self.passed_tests)/len(self.test_results)*100:.1f}%)")
        
        if self.failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"   - {test}")
        
        if self.passed_tests:
            print(f"\n✅ Passed Tests:")
            for test in self.passed_tests:
                print(f"   - {test}")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = APITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)