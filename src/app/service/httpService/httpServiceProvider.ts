import FakeBackendService from "@/app/service/httpService/fakeBackendService.ts";
import { getFirebaseBackend } from "@/app/service/httpService/firebaseService.ts";
import AuthService from '@/app/service/appService/authService';
import UserSettingService from "../appService/UserSettingService";

const fakeBackendService = new FakeBackendService();
const firebaseService = getFirebaseBackend();
const authService = new AuthService();
const userSettingService = new UserSettingService();

export { fakeBackendService, firebaseService, authService, userSettingService };
