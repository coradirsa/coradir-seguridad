"use client"
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FormSchema, InputForm } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import CustomInput from "./customInput";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Loader from "./loader";
import { trackFormSubmit, trackFormSuccess, trackFormError } from "@/utils/analytics";

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
    const {executeRecaptcha} = useGoogleReCaptcha();
    const form = useForm<FormSchema>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });
    const { handleSubmit, formState: { errors , isSubmitting }, control, reset }=form;
    const inputs: InputForm[] = [
        {
            name: "name",
            label: "Nombre",
            type: "text",
            ref:useRef<HTMLInputElement>(null),
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            ref: useRef<HTMLInputElement>(null),
        },
        {
            name: "phone",
            label: "Telefono",
            type: "text",
            ref: useRef<HTMLInputElement>(null),
        },
        {
            name: "message",
            label: "Mensaje",
            type: "textarea",
            ref: useRef<HTMLInputElement>(null),
        },
    ];
    const onSubmit = async (data:FormSchema) => {
        // Track: Inicio de envío de formulario
        trackFormSubmit('contact_form');

        setLoading(true);
        try{
            if (!executeRecaptcha) throw new Error('Debes completar el captcha.');
            const token = await executeRecaptcha('form_submit');
            const verifyCaptcha = await fetch('/api/verify-captcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            const verifyCaptchaJson = await verifyCaptcha.json();
            if (!verifyCaptchaJson.ok) throw new Error(verifyCaptchaJson.error);

        }catch(error : unknown){
            const err = error as Error;
            console.error(error);

            // Track: Error en captcha
            trackFormError('contact_form', err.message);

            setSubmitMessage({
                type: 'error',
                text: err.message,
            });
            setLoading(false);
            return;
        }
       
        const dataToSend = {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            phone: data.phone?.trim() || null, 
            message: data.message?.trim() || null,
            timestamp: new Date().toISOString(),
            source: 'website_coradir_seguridad_form'
          };
        try { 
            const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });
        
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Track: Formulario enviado con éxito (CONVERSIÓN)
            trackFormSuccess('contact_form');

            setSubmitMessage({
                type: 'success',
                text: '¡Gracias por tu interés! Hemos recibido tu solicitud y te contactaremos pronto.',
            });
        } catch (error : unknown) {
            const err = error as Error;
            console.error(err.message);

            // Track: Error al enviar el formulario
            trackFormError('contact_form', err.message);

            setLoading(false);
            setSubmitMessage({
                type: 'error',
                text: 'Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.',
            });
            return;
        }  
        setTimeout(() => {
            setSubmitMessage({ type: '', text: '' });
            reset(); 
        }, 5000);
        setLoading(false);
    }; 
    return (
        <section className="flex flex-col pt-30 md:pt-40 py-10 justify-start items-center w-full mx-auto min-h-[100vh] relative"
        >
            <picture>
                <source
                    media="(max-width: 768px)"
                    srcSet="/img/02/02-mobile.webp"
                    type="image/webp"
                />
                <source
                    media="(max-width: 1024px)"
                    srcSet="/img/02/02-tablet.webp"
                    type="image/webp"
                />
                <source
                    srcSet="/img/02/02-desktop.webp"
                    type="image/webp"
                />
                <Image
                    src="/img/02/02-fallback.jpg"
                    alt="Formulario de contacto - Coradir Seguridad. Solicita información sobre nuestros sistemas de seguridad antipánico"
                    fill
                    priority
                    quality={85}
                    sizes="100vw"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </picture>
            <section className="w-full px-10  flex flex-col items-center bg-transparent relative">
                <h1 className="text-white text-5xl md:text-6xl font-bold text-shadow  ">COMUNICATE<br className="md:hidden"/> CON NOSOTROS</h1>
                { loading ? (
                    <Loader/>
                ):(submitMessage.type === 'success' ? (
                    <section className="flex flex-col items-center justify-center gap-5 bg-red-light p-10 rounded-2xl mt-10">
                        <h2 className="w-full text-sm md:text-xl text-white font-raleway text-center">{submitMessage.text}</h2>
                         
                    </section>
                    ):(
                        <form onSubmit={handleSubmit(onSubmit)} className="py-5 flex flex-col items-center w-[80%] md:w-[50%]">
                            {submitMessage.type === 'error' && (
                                    <div className="mb-6 p-4 rounded-md text-sm bg-red-light text-white md:text-xl text-shadow">
                                        {submitMessage.text}
                                    </div>
                                )}
                            {inputs.map((input)=>(
                                <CustomInput 
                                    key={input.name} 
                                    {...input} 
                                    control={control} 
                                    errors={errors}  
                                />
                            ))}  
                            <button 
                                id="boton-seguridad-contacto"
                                type="submit" 
                                disabled={isSubmitting || Object.keys(errors).length > 0}
                                className={`transition-all duration-300 py-5 my-8 w-full md:w-[50%] mx-auto bg-red-light text-white rounded-2xl uppercase ${isSubmitting || Object.keys(errors).length > 0 ? "opacity-70 cursor-not-allowed" : "hover:scale-102 cursor-pointer"}`}
                            >
                                {isSubmitting ? "Enviando..." : "Enviar"}
                            </button>  
                        </form>
                    )
                )}
            </section>
        </section>
    );
}