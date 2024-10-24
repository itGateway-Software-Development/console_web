import FakeBackendService from "@/app/service/httpService/fakeBackendService.ts";
import { getFirebaseBackend } from "@/app/service/httpService/firebaseService.ts";
import AuthService from '@/modules/auth/services/authService';
import UserProfileService from "@/modules/userProfile/services/UserProfileService";
import LocationService from "@/modules/serverManagement/location/services/LocationService";

const fakeBackendService = new FakeBackendService();
const firebaseService = getFirebaseBackend();
const authService = new AuthService();
const userProfileService = new UserProfileService();
const locationService = new LocationService();

export { fakeBackendService, firebaseService, authService, userProfileService, locationService };
