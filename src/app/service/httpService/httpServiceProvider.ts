import FakeBackendService from "@/app/service/httpService/fakeBackendService.ts";
import { getFirebaseBackend } from "@/app/service/httpService/firebaseService.ts";
import AuthService from '@/modules/auth/services/authService';
import UserProfileService from "@/modules/userProfile/services/UserProfileService";
import LocationService from "@/modules/serverManagement/location/services/LocationService";
import ServerTypeService from "@/modules/serverManagement/serverTypes/services/ServerTypeService";

const fakeBackendService = new FakeBackendService();
const firebaseService = getFirebaseBackend();
const authService = new AuthService();
const userProfileService = new UserProfileService();
const locationService = new LocationService();
const serverTypeService = new ServerTypeService();

export { fakeBackendService, firebaseService, authService, userProfileService, locationService, serverTypeService };
