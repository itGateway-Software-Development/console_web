import FakeBackendService from "@/app/service/httpService/fakeBackendService.ts";
import { getFirebaseBackend } from "@/app/service/httpService/firebaseService.ts";
import AuthService from '@/modules/auth/services/authService';
import UserProfileService from "@/modules/userProfile/services/UserProfileService";

const fakeBackendService = new FakeBackendService();
const firebaseService = getFirebaseBackend();
const authService = new AuthService();
const userProfileService = new UserProfileService();

export { fakeBackendService, firebaseService, authService, userProfileService, };
