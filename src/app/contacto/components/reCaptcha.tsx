"use client"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"; 
import Contact from "./contact";

export default function ReCaptcha( ){
    return(
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
           < Contact/>
        </GoogleReCaptchaProvider>
    );
}