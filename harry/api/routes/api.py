from fastapi import APIRouter
from endpoints import people,organization,search,auth,contact

router = APIRouter()
router.include_router(people.router)
router.include_router(organization.router)
router.include_router(search.router)
router.include_router(auth.router)
router.include_router(contact.router)